---
name: anvil-launch-site
description: 给一个游戏名/关键词,端到端建成一个 AnvilWiki 英文攻略站:环境预检 → 素材采集(yt-dlp+Steam 官方事实)→ 内容总计划(对齐 herosiege 格式)→ apply-template 换皮 → 首批内容并行生产+八门禁 →【本地交付检查点】→ CF Pages 直传部署 → 域名绑定轮询 → IndexNow/GitHub 收口。触发词:建站/上线一个游戏攻略站/launch site/新游戏站/给 XX 做个 wiki/发布 CF。
---

# AnvilWiki 一站式建站管线(游戏名 → 线上站点)

从 2026-09-26 Graveyard Keeper 2 站(立项到上线 <1 天)实战提炼。**两条线**:A 本地开发线(阶段 0-4)交付一个门禁全绿的本地站点;B 发布线(阶段 5-6)默认**等用户明确指令**(「发布 CF」)才启动——支持本地建好、审查后再上线的节奏。基准样本(GK2 站,绝对路径供任意仓库调用时参照):`/Users/zoubob/Documents/AIcoding/webApp/200609/youxizhan/Graveyard-Keeper-2/` 下的 `CONTENT-PLAN.md` + `seo-reports/gk2-materials/` + `gk2-apply-answers.json`。

## 输入与默认值

| 输入 | 默认(未明确时采用并记录) |
|---|---|
| 游戏名/关键词 | (必填) |
| 发布时机 | **later**(阶段 4 本地交付检查点停下,等「发布」指令;now=一路跑到阶段 6) |
| 域名 | 占位域 `<gamename>.wiki/.app` 先行;真域购买后两处替换重建 |
| 换皮位置 | 本仓新分支 `<game>-site`(main 保模板原样) |
| 语言/变现/口径 | en 单语 / 首发不挂广告 / 写完即发:无官方源数值 "community-reported" 措辞 + `gameVersion` 徽章 |
| 仓库 | push 到 origin;**PUBLIC/PRIVATE 需问一次**(经营文档会公开) |

**4 个人工闸门**:① 域名购买 ② 注册商改 NS ③ CF zone+DNS 记录(用户 dashboard,或给 `Zone:DNS:Edit` token 则自动)④ GSC 验证+sitemap 提交(Google 账号)。

---

## 阶段 0 · 仓库与环境预检(进入任何生产动作前)

**仓库态**(不在 AnvilWiki clone 内则先 clone 本仓):
- [ ] `AGENTS.md` + `scripts/apply-template.ts` + `src/content.config.ts` 存在(=模板仓确认)
- [ ] 模板版本:`package.json` version ↔ CHANGELOG 头(是否已换皮?`src/config/site.ts` 仍是 demo 身份 Anvil Quest=未换皮)
- [ ] git 状态 clean;确认建站分支策略(`<game>-site` 新分支)
- [ ] 仓库可见性 `gh repo view --json visibility`(决定经营文档暴露面,问用户)

**工具链与凭据**(缺哪个先补哪个,别到中途爆):
- [ ] node ≥22.13 + pnpm 11(`pnpm -v`);`pnpm install`(node_modules 就绪,allowBuilds 批准 esbuild+sharp)
- [ ] `yt-dlp -v`(素材管道依赖;无则 `pip install yt-dlp`)
- [ ] wrangler 凭据:**剥代理** `npx wrangler whoami` 能列出账户(CF API 一律剥代理,见阶段 5 铁律)
- [ ] `gh auth status`(GitHub push)

**规范文件**(写文与换皮前置阅读):`docs/content-format.md` + `src/content.config.ts`(Zod 硬门禁)+ `src/config/navigation.ts` + 一篇同型 demo 文(未换皮时)。

## 阶段 1 · 素材采集

```bash
mkdir -p seo-reports/<slug>-materials/{transcripts,meta}
yt-dlp "ytsearch12:<Game Name>" --flat-playlist --print "%(view_count)s|%(duration)s|%(channel)s|%(id)s|%(title)s"   # 可加 guide/tips/review 变体查询
yt-dlp --skip-download --write-info-json -o "seo-reports/<slug>-materials/meta/%(id)s" <urls...>                     # 章节=话题骨架最佳来源
yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs "en.*" --sub-format "srt/vtt/best" \
  -o "seo-reports/<slug>-materials/transcripts/%(id)s-%(channel)s.%(ext)s" <urls...>                                  # 429=sleep 90-180 退避 1-2 轮,仍败则放弃(章节够规划,写文时重抓)
```

- **官方事实锚点**:WebFetch Steam 商店页(发售日/开发商/价格/评价%/评测数/平台/语言/新特性)——唯一「已验证」层
- 产出 `MATERIALS.md`:视频分组清单(攻略干货/深度实况/评测情报)+ 官方事实表 + **话题→证据映射**(多源一致=高置信,单源=写文强 hedge);目录按 .gitignore 惯例不入库

## 阶段 2 · 内容总计划

产出根目录 `CONTENT-PLAN.md`,格式对齐姊妹站 `herosiegehelper/hero-siege-content-plan.md`(八节:定位/全貌/产线红线/分批日历/KPI/总量/启动检查单/文档关系):

- **栏目映射**从素材话题量推导;`codes` 栏目仅当有官方兑换码证据才设(GK 系列无码=永久不设);自定义分类(如 zombies)遵守「先有文章再进导航」——上线批配真文
- **双层模型判定**:赛季制 → 常青+赛季层(赛季生命周期排产);买断制 → 常青+版本层(补丁=刷新触发器),发售流量生命周期(首周峰值→首月深挖→补丁新词→长尾)
- 诚实成熟态预估;首批 6-7 篇抢发售热度,每篇挂素材源(视频 ID 直达 MATERIALS.md)

## 阶段 3 · 换皮(B0)

1. 答案表落盘 `<game>-apply-answers.json`(18 个位置参数序:游戏名/短名/域名(裸)/tagline/description/legal/官方URL/主题色hex/平台/开发商/类型/发售日/locales/categories/清demo y/preset/删landing空/proceed y);先 `--dry-run`(尾部「1 leftover」=dry-run 跳过 Proceed,正常)
2. `pnpm apply-template --answers <file>`;自定义新分类手工三处一致(`navigation.ts`+`en.json` nav+overview+内容目录),`pnpm check-config` 必绿
3. **首页去 demo 化**(en.json):hero(**含官方 trailer `videoId`——HomePage 契约必需,缺失=typecheck 红**)/start/explore(displayType 见 home.schema)/faq 四模块;codes 残留槽位全清
4. `pnpm gen-assets`;删残留(ja 目录/占位 scaffold);`pnpm template-audit` 体检换皮残留
5. wrangler.toml:`name = "<project>"` + **`pages_build_output_dir = "dist"`**;项目名注意 pages.dev 子域全局唯一,撞名换名(加后缀 `-wiki` 等)

## 阶段 4 · 内容生产(B1+ 并行)→ 本地交付检查点

- **3 路 agent 并行**,每路 3-4 篇;每篇 brief 必含:精确 slug/标题/分类/tags(词汇表)/嵌入视频 ID(11 位)/**事实清单(标置信)**/允许内链白名单(只指真实存在或同批将存在的页)
- 硬规则(违反=门禁红):frontmatter 恰好规定字段;title≤80/description 40-165/summary 40-60 词≤400 字符/FAQ 4 条;正文无 H1、H2 问题式、800-1100 词、内链尾斜杠、**数值零编造**(单源话题设「未验证」诚实节);正文完全重写,字幕只做事实参考;缩略图只做视觉参考
- `pnpm gen-covers`(自动接线 image)→ **八门禁** → 枢纽页回填深链(hub-and-spoke)
- **构建铁律:`SITE_URL=https://<domain> pnpm build`**——sitemap/RSS 走 SITE_URL env(缺省回落 demo 域 anvil.wiki!),canonical 走 site.ts;不传=上线即错域
- fork 测试口径:上游模板元测试(断言 demo 态/landing/ja)移 `tests/template-meta/` + vitest/tsconfig 双排除(不删除,保上游 merge);fork 相关套件的 ja/demo 硬编码改单语口径;AGENTS 套件计数同步(agents-consistency 门禁会逼)
- **【本地交付检查点】**:`git commit` 到站点分支 → 向用户报告:内容清单+门禁结果+预览方式(`pnpm dev` / preview deploy 可选)→ **停,等「发布」指令**(除非输入 deploy=now)

## 阶段 5 · CF Pages 部署(发布线,显式触发)

⚠️ **铁律:所有 CF API/wrangler 调用必须 `env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY -u all_proxy -u ALL_PROXY` 剥代理**——代理会间歇性毁掉 api.cloudflare.com 请求,报 10000 "Authentication error" 假象(实测排障 30 分钟教训)。

```bash
SITE_URL=https://<domain> pnpm build    # 发布前最后一次构建必带 SITE_URL
env -u ... npx wrangler pages project create <project> --production-branch main    # API 不自动建项目
env -u ... npx wrangler pages deploy dist --project-name <project> --branch main --commit-dirty=true
```

- **域名链**(zone 在 CF 账户后):POST `/accounts/{acc}/pages/projects/{p}/domains` 挂域 → CNAME `@`→`<project>.pages.dev`(Proxied;Pages API **不会**自动建 DNS,需用户 dashboard 或 DNS:Edit token)→ 轮询 `verification_data.status`=active(CNAME 验证过)→ 轮询 `status`=active(证书签发,1-15 分钟)→ 直连 curl 全站 200
- 占位域策略:canonical 先声明真域,pages.dev 不被索引,绑域后零迁移;**真域≠占位域时**:wrangler.toml SITE_URL + site.ts domain 两处替换 → 带 SITE_URL 重建 → 重发
- 诊断:`verification_data.error_message` 写明缺什么("CNAME record not set"=记录没建);dig 看解析;**API flapping 先怀疑代理**

## 阶段 6 · 收口

- `pnpm submit-indexnow --site`(域名生效后;⚠️ 直传部署没有 git-connected CI,**v2.36 的 IndexNow 自动化不生效**,手动推是唯一通道;之前推占位域 URL 无意义)
- `git push` 站点分支(可见性已确认)
- 交用户:GSC 网域验证(TXT 记录)+ 提交 `https://<domain>/sitemap-index.xml`;「Success + Discovered 0」=处理延迟非故障(自查:curl index/子图 200、python 解析条目数、xmlns 正确即无事)
- 收尾排产:B2+ 按日历,每批 +7 天看 GSC 调序

## 验收清单

**本地交付(A 线出口)**:素材库留存 / CONTENT-PLAN 八节 / check-config 绿 / 首页无 demo 残留 / typecheck 0 错 / 八门禁全绿(test 计数与 AGENTS 一致) / 已 commit
**上线交付(B 线出口)**:线上四项 200 + title 正确 + canonical=真域 / IndexNow 202 / 分支已 push / GSC 步骤已移交

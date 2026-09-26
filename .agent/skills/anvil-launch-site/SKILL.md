---
name: anvil-launch-site
description: 给一个游戏名/关键词,端到端建成并上线一个 AnvilWiki 英文攻略站:素材采集(yt-dlp+Steam 官方事实)→ 内容总计划(对齐 herosiege 格式)→ apply-template 换皮 → 首批内容并行生产+八门禁 → CF Pages 直传部署 → 域名绑定轮询 → IndexNow/GitHub 收口。触发词:建站/上线一个游戏攻略站/launch site/新游戏站/给 XX 做个 wiki。
---

# AnvilWiki 一站式建站管线(游戏名 → 线上站点)

从 2026-09-26 Graveyard Keeper 2 站(立项到上线 <1 天)实战提炼的完整管线。输入一个游戏名,按本技能六阶段推进;**4 个人工闸门**以外全部自动。参考实现:`CONTENT-PLAN.md` + `seo-reports/gk2-materials/`(GK2 站为基准样本)。

## 输入与默认值

| 输入 | 默认(未明确时采用并记录) |
|---|---|
| 游戏名/关键词 | (必填) |
| 域名 | 占位域 `<gamename>.wiki/.app` 先行;真域用户购买后两处替换重建 |
| 换皮位置 | 本仓新分支 `<game>-site`(main 保模板原样) |
| 语言 | en 单语 |
| 变现 | 首发不挂广告,流量达标后 anvil-adsense-audit 再开 |
| 口径 | 写完即发:无官方源数值一律 "community-reported / unverified" 措辞 + `gameVersion` 徽章,IG 后核后改 |
| 仓库 | push 到用户 origin(可见性 PUBLIC/PRIVATE 需问一次——经营文档会公开) |

**4 个人工闸门**(外者皆自动):① 域名购买 ② 注册商改 NS ③ CF zone+DNS 记录(用户 dashboard 点,或用户给带 `Zone:DNS:Edit` 的 API token 则自动)④ GSC 验证+sitemap 提交(Google 账号)。

---

## 阶段 1 · 素材采集(全专利管道:youtube-content-gen 式)

```bash
# 通道:yt-dlp 本地工具(WebSearch 配额耗尽时的可靠替代);python3 必有 yt-dlp
mkdir -p seo-reports/<slug>-materials/{transcripts,meta}
# 1a. 搜视频(12 条起点,可加 guide/tips/review 变体查询)
yt-dlp "ytsearch12:<Game Name>" --flat-playlist --print "%(view_count)s|%(duration)s|%(channel)s|%(id)s|%(title)s"
# 1b. 元数据(info.json 含章节/描述/播放数)——章节是话题骨架的最佳来源
yt-dlp --skip-download --write-info-json -o "seo-reports/<slug>-materials/meta/%(id)s" <urls...>
# 1c. 英文字幕( manual+auto 都要;HTTP 429=限流,sleep 90-180 退避重试 1-2 轮,
#     仍失败则放弃自动补抓——章节骨架已够规划,写文时 anvil-new-article Step 0 重抓)
yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs "en.*" --sub-format "srt/vtt/best" -o "seo-reports/<slug>-materials/transcripts/%(id)s-%(channel)s.%(ext)s" <urls...>
```

- **官方事实锚点**:WebFetch Steam 商店页(发售日/开发商/发行商/价格/评价%/评测数/平台/语言/新特性描述)——这是唯一「已验证」层,写站名/slogan/About 用
- 产出 `seo-reports/<slug>-materials/MATERIALS.md`:视频清单(按攻略干货/深度实况/评测情报分组)+ 官方事实表 + **话题→证据映射表**(多源一致=高置信,单源=写文时强 hedge)
- 该目录按 .gitignore 惯例不入库(磁盘留存)

## 阶段 2 · 内容总计划

产出根目录 `CONTENT-PLAN.md`,**格式对齐姊妹站** `herosiegehelper/hero-siege-content-plan.md`(八节:定位/全貌/产线红线/分批日历/KPI/总量/启动检查单/文档关系)。要点:

- **栏目映射**:从素材话题量推导;`codes` 栏目**仅当有官方兑换码证据**才设(GK 系列无码=永久不设,绝不编造);自定义分类(如 zombies)遵守「先有文章再进导航」——上线批必须配真文
- **双层模型判定**:赛季制(如 Hero Siege)→ 常青层+赛季层,赛季生命周期排产;买断制(如 GK2)→ 常青层+版本层,补丁=刷新触发器,发售流量生命周期(首周峰值→首月深挖→补丁新词→长尾)
- **诚实成熟态预估**(不虚设目标);首批 6-7 篇抢发售热度窗口,每篇挂素材源(视频 ID 直达 MATERIALS.md)

## 阶段 3 · 换皮(B0)

1. 答案表落盘 `<game>-apply-answers.json`(18 个位置参数,**序**: 游戏名/短名/域名(裸)/tagline/description/legal/官方URL/主题色hex/平台/开发商/类型/发售日/locales/categories/清demo y/preset/删landing空/proceed y);先 `--dry-run` 验证对齐(尾部「1 leftover」=dry-run 跳过 Proceed,正常)
2. `pnpm apply-template --answers <file>`;自定义新分类手工三处一致(`navigation.ts` + `en.json` nav+overview + 内容目录),`pnpm check-config` 必绿
3. **首页去 demo 化**(en.json):hero(**含官方 trailer `videoId`——HomePage 契约必需,缺失=typecheck 红**)/start/explore(displayType 见 home.schema)/faq 四模块重写;codes 残留槽位全清
4. `pnpm gen-assets`(品牌色重生成 favicon+hero);删残留(ja 目录/占位 scaffold)
5. wrangler.toml:`name = "<project>"` + **`pages_build_output_dir = "dist"`**(部署必需)

## 阶段 4 · 内容生产(B1+ 并行)

- **3 路 agent 并行**,每路 3-4 篇;每篇 brief 必含:精确 slug/标题/分类/tags(词汇表)/嵌入视频 ID(11 位)/**事实清单(标注置信)**/允许内链白名单(只指真实存在或同批将存在的页)
- 硬规则(违反=门禁红):frontmatter 恰好规定字段;title≤80/description 40-165/summary 40-60 词≤400 字符/FAQ 4 条;正文无 H1、H2 问题式、800-1100 词、内链尾斜杠、**数值零编造**(单源话题设「未验证」诚实节);正文完全重写,字幕只做事实参考;缩略图只做视觉参考
- 写完:`pnpm gen-covers`(16 张自动接线 image 字段)→ 八门禁 → 枢纽页回填深链(hub-and-spoke)
- **构建铁律:`SITE_URL=https://<domain> pnpm build`**——sitemap/RSS 走 SITE_URL env(缺省回落 demo 域 anvil.wiki!),canonical 走 site.ts;不传=上线即错域
- fork 测试口径:上游模板元测试(断言 demo 态/landing/ja)移 `tests/template-meta/` + vitest/tsconfig 双排除(不删除);fork 相关套件硬编码 ja/demo 的改成单语口径;AGENTS 套件计数同步(agents-consistency 门禁会逼)
- git commit 到站点分支

## 阶段 5 · CF Pages 部署

⚠️ **铁律:所有 CF API/wrangler 调用必须 `env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY -u all_proxy -u ALL_PROXY` 剥代理**——代理会间歇性毁掉 api.cloudflare.com 请求,报 10000 "Authentication error" 假象(本站实测排障 30 分钟的教训)。

```bash
# 前置:npx wrangler whoami 剥代理能通 = 凭据在位
env -u ... npx wrangler pages project create <project> --production-branch main   # API 不会自动建项目
env -u ... npx wrangler pages deploy dist --project-name <project> --branch main --commit-dirty=true
```

- **域名链**(zone 在 CF 账户后):POST `/accounts/{acc}/pages/projects/{p}/domains` 挂域 → CNAME `@`→`<project>.pages.dev`(Proxied;Pages API **不会**自动建 DNS,需用户 dashboard 或带 DNS:Edit 的 token)→ 轮询 `verification_data.status` 转 active(=CNAME 验证过)→ 轮询 `status` 转 active(=证书签发,1-15 分钟)→ 直连 curl 全站 200 验证
- 占位域策略:canonical 先声明真域,pages.dev 不会被索引,绑域后零迁移成本;**真域≠占位域时**:wrangler.toml SITE_URL + site.ts domain 两处替换 → 带 SITE_URL 重建 → 重发
- 诊断技巧:`validation_data`/`verification_data.error_message` 写明缺什么("CNAME record not set"=记录没建);dig 看解析;**API flapping 先怀疑代理**

## 阶段 6 · 收口

- `pnpm submit-indexnow --site`(域名生效后;之前推占位域 URL 无意义)
- git push 站点分支(gh 已登录;PUBLIC/PRIVATE 已在输入确认)
- 交用户:GSC 网域资源验证(TXT 记录)+ 提交 `https://<domain>/sitemap-index.xml`;GSC「Success + Discovered 0」=处理延迟非故障(自查:curl index/子图 200、40 条目、xmlns 正确即无事)
- 收尾排产:B2+ 按日历,每批 +7 天看 GSC 展示/点击调序

## 验收清单(全绿=站点交付)

- [ ] 素材库 MATERIALS.md + meta/*.info.json + 字幕留存
- [ ] CONTENT-PLAN.md 八节齐全,人工闸门清单已告知
- [ ] check-config 绿;首页无 demo 残留;typecheck 0 错
- [ ] 八门禁全绿(test 计数与 AGENTS 一致)
- [ ] 线上:首页/文章/分类/sitemap 四项 200,title 正确,canonical=真域
- [ ] IndexNow 202;分支已 push;GSC 步骤已移交

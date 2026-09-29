---
name: anvil-launch-site
description: 给一个游戏名/关键词,端到端建成一个 AnvilWiki 英文攻略站:每游戏独立仓库初始化 → 环境预检 → 素材采集(yt-dlp+Steam 官方事实)→ 内容总计划(根目录 CONTENT-PLAN.md,八节格式)→ apply-template 换皮 → 首批内容并行生产+八门禁——发布到 CF 之前全程零提问全自动 → CF Pages 直传部署 → 域名人工绑定(默认)后自动轮询收尾 → IndexNow/GitHub 收口。触发词:建站/上线一个游戏攻略站/launch site/新游戏站/给 XX 做个 wiki/发布 CF。
---

# AnvilWiki 一站式建站管线(游戏名 → 线上站点)

实战提炼自三个全流程样本(绝对路径供任意会话参照,**抄结构不抄内容**):
- Graveyard Keeper 2 站(2026-09-26,立项到上线 <1 天):`/Users/zoubob/Documents/AIcoding/webApp/200609/youxizhan/Graveyard-Keeper-2/`
- Well Dweller 站(2026-09-26,立项到真域证书生效 ~2h,独立仓库+人工绑域先例):`/Users/zoubob/Documents/AIcoding/webApp/200609/youxizhan/Well Dweller/`
- Steal An Egg 站(2026-09-28,Roblox 游戏→Roblox API 替代 Steam 锚点;立项到 pages.dev 上线 8h20m,**有效工作仅 ~2.5h——3 路内容 agent 停滞空耗 6h/72%,已完成阶段 4 编排修正**):`/Users/zoubob/Documents/AIcoding/webApp/200609/youxizhan/steal an egg/`

**自动化边界(硬规则)**:阶段 0-4 + 阶段 5 的部署动作**全程零提问**,所有决策按「输入与默认值」表自动取默认并在最终报告里记录——中途不 ask、不停下等确认。人工只出现在两处:**域名绑定**(默认人工,见下)和 **GSC 验证**(Google 账号)。

## 输入与默认值

| 输入 | 默认(未明确时自动采用,不问,最终报告记录) |
|---|---|
| 游戏名/关键词 | (必填) |
| 发布时机 | **now=默认**(0→6 一路跑完);later=阶段 4 结束报告后停,**报告本身不算提问** |
| 域名 | 用户已注册真域则直接用(canonical 先声明真域=zero-migration);未注册则占位域 `<gamename>.wiki/.app` 先行,真域到位后两处替换重建 |
| **域名绑定** | **默认人工**:用户 dashboard + 注册商操作(见 4 个人工闸门);用户主动给 `Zone:DNS:Edit` token 才切自动,不主动索取 |
| 仓库 | **每游戏独立仓库**:新目录 → git init → GitHub 建 `<game>` 私有仓(默认 **Private**,不问;经营文档含 CONTENT-PLAN/挖词策略) |
| 换皮位置 | 该独立仓内分支 `<game>-site`(main 保模板原样,可回退可对照上游) |
| 语言/变现/口径 | en 单语 / 首发不挂广告 / 写完即发:无官方源数值 "community-reported" 措辞 + `gameVersion` 徽章 |

**4 个人工闸门**(全部用户侧,管线把每步操作指令写到「打开哪个页面点哪个按钮」粒度):
① 域名购买 ② 注册商改 NS(指向 CF 分配的两个 NS)③ CF dashboard 加 zone + 建 **CNAME `@` → `<实际项目子域>.pages.dev`(Proxied)** ④ GSC 网域验证(TXT)+ sitemap 提交。
闸门③的 TXT/CNAME 都加在 **CF dashboard**(NS 已切走,注册商 DNS 面不再生效);闸门③④之间无依赖,可并行。

---

## 阶段 0 · 独立仓库与环境预检(全自动)

**每游戏独立仓库初始化**(模板源:AnvilWiki zip 解压或 clone 任一,以现有姊妹站同构为准):
```bash
mkdir "<Game Name>" && cd "<Game Name>"          # 目录名=游戏名(带空格 OK)
# 模板文件就位(zip 解压 / clone 后删 .git)
git init -b main && git add -A && git commit -m "chore: import AnvilWiki template vX.Y.Z (pristine)"
git checkout -b <game>-site                       # 之后全部工作在站点分支
gh repo create <game> --private                   # 独立 GitHub 仓;push 在阶段 6
```
- [ ] `AGENTS.md` + `scripts/apply-template.ts` + `src/content.config.ts` 存在(=模板确认);模板版本 `package.json` ↔ CHANGELOG 头;`src/config/site.ts` 仍为 demo 身份=未换皮(正确初始态)
- [ ] 工具链:node ≥22.13 + pnpm 11;`pnpm install`(后台跑,allowBuilds 批 esbuild+sharp);`yt-dlp -v`;**剥代理** `npx wrangler whoami` 出账户;`gh auth status`
- [ ] CF 账户确认:whoami 出 Account ID(记下,后续 API 用);`gh` 默认账号=推送身份

**规范文件**:写文与换皮前读 `docs/content-format.md` + `src/content.config.ts`(Zod 硬门禁)+ `src/config/navigation.ts` + 姊妹站一篇同型真文(比 demo 文更贴近 fork 后形态)。

## 阶段 1 · 素材采集(全自动)

```bash
mkdir -p seo-reports/<slug>-materials/{transcripts,meta}
yt-dlp "ytsearch12:<Game Name>" --flat-playlist --print "%(view_count)s|%(duration)s|%(channel)s|%(id)s|%(title)s"   # 加 guide/tips/review 变体查询
yt-dlp --skip-download --write-info-json -o "seo-reports/<slug>-materials/meta/%(id)s" <urls...>                     # 章节=话题骨架最佳来源
yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs "en.*" --sub-format "srt/vtt/best" \
  -o "seo-reports/<slug>-materials/transcripts/%(id)s-%(channel)s.%(ext)s" <urls...>                                  # 429=sleep 90-180 退避;无解说实况字幕≈纯游戏音轨噪音,价值低属正常
```
- **⚠️ YouTube 反爬现状(2026-09-28 Steal An Egg 三连实测,上行裸命令已失效)**:完整可用形态=`yt-dlp --cookies-from-browser chrome --remote-components ejs:github --extractor-args "youtube:player_client=web_embedded" ...`——chrome cookies 过 bot check("Sign in to confirm you're not a bot"),ejs 远程组件解 JS challenge(提示装就装),**web_embedded 是唯一免 PO-token 拿到字幕的 player_client**(实测 default/tv_embedded/mweb 全被 PO token 门槛丢弃);youtube-transcript-api 同样整批被拒;代理环境首批批量静默全灭时,先单视频跑完整报错定位是哪层拦截再批跑
- **屏幕文字类证据(codes/UI 数值)走帧采样**:字幕抓不到屏幕文字(grep 两轮空手实证)→ `yt-dlp -f "worst[height>=240]/worst" --download-sections "*60-480"` 下载低清段(约 20MB/7min)→ ffmpeg `fps=1/15,scale=640:-1` 抽帧 → `tile=3x3` 拼联络表 → Read 目检逐字抄录(渐进打字帧可确认完整拼写,如 experiment#013/4billionvisits);补帧注意 --download-sections 后时间戳=文件内寻址(原视频 t 秒 − 段起点)
- **官方事实锚点**:WebFetch Steam 搜索页(`store.steampowered.com/search/?term=<name>`)定 appid,再 WebFetch 商店页(发售日/开发商/价格/评价%/评测数/平台/语言/功能/简介原文)——唯一「已验证」层
- **配额与反爬降级**:WebSearch 工具配额会耗尽(429/limit)→ 直接 WebFetch Steam 页面;Steam 图片 CDN(shared.cloudflare.steamstatic.com 等)墙内返回 HTML → **品牌色从游戏身份推导**(主角/核心意象),不在头图上阻塞
- 产出 `MATERIALS.md`:视频分组清单(攻略干货/深度实况/评测情报)+ 官方事实表 + **话题→证据映射**(多源一致=高置信,单源=写文强 hedge)+ Boss/系统名单类结构化证据;字幕留存数量如实记录(部分视频无英字属正常,章节可补位)

## 阶段 2 · 内容总计划(全自动)

**输出契约**:文件名固定 `CONTENT-PLAN.md`,放独立仓根目录;八节骨架抄样本——一 定位声明与内容模型 / 二 游戏内容全貌×逐栏目待建表 / 三 产线与红线 / 四 分批搭建日历 / 五 KPI 与调整机制 / 六 总量与优先级总览 / 七 启动前一次性检查 / 八 与其他文档的关系:

- **栏目映射**从素材话题量推导;`codes` 仅当有官方兑换码证据才设(单机买断制默认永久不设,写入 §2.4 备忘);自定义分类守「先有文章再进导航」
- **双层模型判定**:赛季制 → 常青+赛季层;买断制 → 常青+版本层(补丁=刷新触发器),发售流量生命周期(首周峰值→首月深挖→补丁新词→长尾)
- 首批 6-7 篇抢发售窗口(游戏发售 ≤1 周=黄金窗口,**当天立项当天上线**);**§2 各待建表逐篇挂素材(视频 ID)与目标词**——无素材支撑的词不立项;诚实成熟态预估(单人开发银河城 ~35-45 页量级,勿虚设 90+)

## 阶段 3 · 换皮(B0,全自动)

1. 答案表落盘 `<game>-apply-answers.json`(18 位置序:游戏名/短名/域名(裸)/tagline/description/legal/官方URL/主题色hex/平台/开发商/类型/发售日/locales/categories/清demo y/preset/删landing空/proceed y);`printf '' | pnpm apply-template --answers <file> --dry-run`(尾部「1 leftover」=dry-run 跳过 Proceed,正常)→ 正式跑
2. 自定义新分类手工三处一致(`navigation.ts`+`en.json` nav+overview+内容目录),`pnpm check-config` 必绿
3. **首页去 demo 化**(en.json):hero(**含官方 trailer `videoId`——HomePage 契约必需,缺失=typecheck 红**)/start/explore(displayType 六选一:badge-list/steps/ranked-grid/labeled-cards/timeline/video-grid;highlight 字段形状各不同,改前读子组件 Props)/faq 四模块;codes 残留槽位全清;FAQ 含「无兑换码」诚实口径(若 codes 不设)
4. `pnpm gen-assets`;删占位 scaffold;`pnpm template-audit` 体检(预期 14/14)
5. **CF Pages 项目立刻创建**(占住 pages.dev 子域,不等内容):
   ```bash
   env -u ... npx wrangler pages project create <project> --production-branch main
   # ⚠️ 子域全局唯一,撞名 CF 自动加后缀:welldweller → welldweller-429.pages.dev(实战先例)
   # 创建即把【实际返回的完整子域】告知用户作 CNAME 目标——不是 <project>.pages.dev!
   ```
6. wrangler.toml:`name = "<project>"`(SITE_URL apply-template 已按答案表写入,核对即可)

## 阶段 4 · 内容生产(B1+ 并行,全自动)→ 交付报告

- **分工铁律(2026-09-28 修正,Steal An Egg 6h 停滞实证)**:① **P0 页主线亲自写**——codes 页(词簇最粗管+首页逐字契约)+ tier list,不容 agent 失败风险;② **agent 每路 1 篇**只写长尾页(2-3 路并行,粒度减半=断流损失减半);③ **brief 内嵌全部引文**——素材消化(转写通读/grep 提炼/数值归属/帧实录码值)在主线完成,所需引文**逐字**写进 brief,**agent 零素材读取、纯写作**(读长转写是停滞热区,从根上消灭)
- **心跳巡检(硬规则,不等完成通知——完成通知对卡死的 agent 永不 fire,实证假活 5h54m)**:agent 发射后用 ScheduleWakeup(15 分钟粒度)或等价定时机制查盘 `ls src/content/wiki/en/*/*.mdx`;任一 agent **零产出满 30 分钟即 TaskStop 杀+主线按同 brief 亲自接管**;有产出则等下一跳。主线接管永远快于空等(实证:接管后 60 分钟写完 5 篇且一次过八门禁;停死的 agent 收 SendMessage 也只再读一轮素材不落盘)
- 每篇 brief 必含:精确 slug/标题/分类/tags(词汇表)/嵌入视频 ID(11 位)/已验证事实块(引文原文+来源归属+置信层)/允许内链白名单(只指真实存在或同批将存在的页)/单源 hedge 纪律/剧透纪律(结局/Boss 身份反转页首加纯文字 Spoiler Warning)
- 硬规则(违反=门禁红):frontmatter 恰好规定字段;title≤80/description 40-165/summary 40-60 词≤400 字符/FAQ 4 条;正文无 H1、H2 问题式、800-1100 词、内链尾斜杠、**数值零编造**(单源话题设「未验证」诚实节);正文完全重写,字幕只做事实参考;MDX 纯 Markdown(无 JSX/import),frontmatter `videos` 注册+正文外链引用(姊妹站先例,免内嵌组件)
- **trinket/物品类页面名字纪律**:两源同名才可写为确认项,单源必须 players-report 措辞,零证据则重心落系统层+「以游戏内图鉴为准」诚实句——宁可少写不可编造
- `pnpm gen-covers`(自动接线 image)→ **⚠️ gen-covers 已实测弄坏过 frontmatter(交错重复块)→ 接线后必跑 YAML 校验**:
  ```bash
  python3 -c "import glob,re,yaml; [yaml.safe_load(re.match(r'^---\n(.*?)\n---\n', open(f).read(), 16).group(1)) for f in glob.glob('src/content/wiki/en/*/*.mdx')]"
  ```
  坏则整块重建 frontmatter(YAML safe_load 过 + description/summary 字符数复核)
- **八门禁**:lint / typecheck / test / check-config / check-content / check-i18n --strict-ui / `SITE_URL=https://<domain> pnpm build`(铁律:缺省回落 demo 域!)/ check-links
- **fork 测试口径收口(机械步骤,照抄姊妹站)**:①`git mv` 恰好 8 个套件入 `tests/template-meta/`:apply-template / changelog / codes-consistency / community-digest / handbook / landing-paths / redirects / workflows + README(模板元测试,demo 态断言换皮后必红,不删保上游 merge)②vitest exclude `tests/template-meta/**` + tsconfig exclude `tests/template-meta` ③补丁:content-utils fixture ja→en / routing-flags `readLocales→['en']` ×2 / seo pageTitle fixture→新游戏名 / url+tags 的 `const ja = 'ja' as never` cast(typecheck 需要,vitest 不报)④AGENTS.md 套件行 22→14 改清单(agents-consistency 门禁会逼)⑤预期终态:**14 套件 161 tests 全绿**
- **交付报告**(不是提问):内容清单+门禁结果+预览方式;发布时机=now 则继续阶段 5,later 则停

## 阶段 5 · CF Pages 部署(全自动;域名绑定人工)

⚠️ **铁律 1:所有 CF API/wrangler 调用剥代理** `env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY -u all_proxy -u ALL_PROXY`——代理间歇性毁掉 api.cloudflare.com,报 10000 "Authentication error" 假象。
⚠️ **铁律 2:wrangler OAuth token ~1h 过期**(config 里 `cfoat_` 前缀),直连 API 前先跑任一 wrangler CLI 命令(如 whoami)触发自动刷新,再现 grep token——否则 9109 "Invalid access token"。

```bash
SITE_URL=https://<domain> pnpm build    # 发布构建必带 SITE_URL
env -u ... npx wrangler pages deploy dist --project-name <project> --branch main --commit-dirty=true
```

- **挂域(管线自动)**:POST `/accounts/{acc}/pages/projects/{p}/domains` `{"name":"<domain>"}` → 轮询 `verification_data.status`=active(CNAME 验证)→ `status`=active(证书签发,1-15 分钟,每 20-30s 轮询)→ 直连 curl 全站 200 + title + canonical
- 🚨 **挂域后 60 秒内必做:读 `verification_data.error_message`,不能只看 `status=pending`**——pending ≠ 排队中,error_message 才是真相(实测会挂着 `"CNAME record not set"` 摆数小时,而 status 一直只显示 pending)。**pending 超 10 分钟仍未 active,一律先查 error_message + 顶点记录类型,禁止继续盲等**(2026-09-29 Steal An Egg 站因此白等 6h;该陷阱已三度复发)。查询:`curl -s -H "Authorization: Bearer $TOK" "https://api.cloudflare.com/client/v4/accounts/$ACC/pages/projects/$PROJ/domains"`(剥代理)
- **域名绑定(默认人工)**:管线把三步操作写到按钮粒度交给用户——①CF dashboard Add a domain(Free 计划)②注册商 Nameservers 改 Custom DNS 填 CF 两个 NS ③DNS Records 建件 **CNAME**,Name 填 **`@`**(留空亦可,勿填全域名,会拼成 xxx.welldweller.net),Target 填**实际项目子域**,Proxied 橙云开启 ④**若顶点已有记录(注册商停放/旧 A/旧 CNAME),先删净再建**——否则 CF 建不了 CNAME,见下方陷阱。后台 20-30s 轮询自动接管后续
- **顶点记录占位陷阱(实战三次踩:两次 A 记录、一次注册商停放)**:顶点存在任何 A/CNAME 时 Pages 都建不出 CNAME,验证器报 **"CNAME record not set"**(它读 zone 内部记录表,权威判断,dig 看不出来)。三种来源:①用户照抄其他站 CF anycast IP 建的 A 记录 ②**注册商开通时自动建的停放记录**——2026-09-29 Namecheap 实证 `A <domain> → 192.64.119.157` + `CNAME www → parkingpage.namecheap.com`,**用户从未建过任何记录,是注册商默认行为**,故新域接管后应主动清停放记录而非等报错 ③上一轮遗留的旧 CNAME。诊断:①`verification_data.error_message` ②`dig +short <domain> A @1.1.1.1`(顶点有解析=有记录)③`dig +short www.<domain> CNAME @1.1.1.1`(看 www 指向)。修复=删占位记录后建指向**实际项目子域**的 CNAME(Proxied)。⚠️ **MX(注册商 eforward 邮件转发)与 TXT SPF 常与停放记录并存,必须保留,删了会断邮件转发**。**proxied CNAME 在 DNS 应答里被压平成 A 记录属正常,dig 无 CNAME ≠ 记录不存在,以验证 API 为准**
- 占位域策略:canonical 先声明真域,pages.dev 不被索引,绑域后零迁移;真域≠占位域时:wrangler.toml SITE_URL + site.ts domain 两处替换 → 带 SITE_URL 重建 → 重发

## 阶段 6 · 收口(管线自动 + GSC 移交)

- `pnpm submit-indexnow --site`(域名生效后;⚠️ 直传部署无 git-connected CI,v2.36 IndexNow 自动化不生效,手动推是唯一通道;之前推占位域 URL 无意义)
- `git push -u origin main <game>-site`(独立私有仓,双分支)
- CONTENT-PLAN §7 检查单状态回填(部署/域名行勾掉+日期)→ commit → push
- **交用户 GSC(唯一剩余人工闸)**:①search.google.com/search-console → 添加资源 → **网域类型** → `welldweller.net` ②复制 `google-site-verification=...` TXT → **加在 CF dashboard DNS**(NS 已切走,注册商无效)③回 GSC 点验证 ④站点地图提交 `https://<domain>/sitemap-index.xml`;「Success + Discovered 0」=处理延迟非故障(自查:curl index/子图 200、python 解析条目数、xmlns 正确即无事)
- 收尾排产:B2+ 按日历,每批 +7 天看 GSC 调序;每个官方补丁=版本层刷新触发器

## 验收清单

**本地交付(A 线出口)**:独立仓双分支就位 / 素材库留存 / CONTENT-PLAN 八节 / check-config 绿 / 首页无 demo 残留 / typecheck 0 错 / 八门禁全绿(14 套件 161 tests,AGENTS 清单一致)/ gen-covers 后 YAML 校验过 / 已 commit
**上线交付(B 线出口)**:线上四项 200 + title 正确 + canonical=真域 / IndexNow 202 / 双分支已 push / CONTENT-PLAN 检查单回填 / GSC 步骤已移交(按钮粒度指令)

## 附:各阶段技能与工具调用矩阵

| 阶段 | Skill | CLI/脚本 | 内置工具 |
|---|---|---|---|
| 0 预检+独立仓 | — | git init / gh repo create / pnpm -v / wrangler whoami(剥代理) / pnpm install | Bash·Read·Glob |
| 1 素材 ⭐ | **youtube-content-gen**(方法论;Gemini/Next.js 实现层不采用,v2.7.0 裁决) | **yt-dlp 三连**(429 退避);备选:agent-reach | **WebFetch Steam 商店页**(WebSearch 配额耗尽时的主通道)、Bash |
| 2 计划 | anvil-find-keywords(游戏未定/需求存疑时) | — | Read(两个样本骨架)、WebFetch(SERP 抽查) |
| 3 换皮 | — | apply-template --answers / gen-assets / check-config / template-audit / **pages project create(提前占子域)** | Edit·Bash |
| 4 内容 | **anvil-new-article**(单篇规范)、**anvil-batch-articles**(同构批反重复) | gen-covers + **YAML 校验** + 八门禁 | **Agent 工具(P0 主线亲写;agent 每路 1 篇纯写作 brief+15min 心跳查盘,零产出 30min 杀+接管)**、Edit |
| 5 部署 | — | wrangler pages deploy、curl 轮询(剥代理+token 刷新) | Bash |
| 6 收口 | 运营期:anvil-refresh / anvil-adsense-audit / anvilwiki-ops(GSC,可选) | submit-indexnow --site / gh push | Bash |

素材置信分层纪律:Steam 官方事实=「已验证」层,YouTube 社区素材=「未验证待核」层——直接决定写文 hedging 强度;info.json 的 chapters 字段是话题提取核心(比通读字幕省且准);无解说实况的自动字幕≈游戏音轨噪音,不作事实源。

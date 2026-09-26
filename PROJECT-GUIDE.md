# PROJECT-GUIDE — AnvilWiki 项目导览 & 英文攻略站搭建手册

> 留存备用 · 生成于 2026-09-26 · 基于 AnvilWiki **v2.36.0**
> 本文是个人工作参考文档,不属于模板本体,勿随发版同步。

---

## 一、项目是什么

**AnvilWiki** = 开源(MIT)游戏 wiki 站模板,专为「AI agent 驱动建站」设计:

- **Astro 7 纯静态**,零适配器部署到 **Cloudflare Pages**,免费无限带宽,Lighthouse 4×100
- **MDX 内容 + Zod schema 硬门禁**——frontmatter 写错直接 build 失败,不带病上线
- **i18n**:英文是默认语言(URL 无前缀 `/bosses/x/`),其他语言带前缀(`/ja/...`)
- **SEO 全家桶**:sitemap hreflang / JSON-LD(Article·FAQ·Video) / RSS / llms.txt / IndexNow 自动推送(v2.36 新 fork 零配置)
- **变现内置**:AdSense 3 位置 + Adsterra(iframe sandbox 隔离) + 移动端锚条;env 空值=组件不渲染,同意门控
- **CI 八道门禁**:typecheck / lint / test(22 套件 325 用例) / check-config / check-content / check-i18n / build / check-links,全绿才准合

权威文档:`docs/PRD.md`(架构唯一真相源)、`AGENTS.md`(工作约束)、`CHANGELOG.md`(发版史)。

---

## 二、三层架构(改任何东西前先判断归属层)

| 层 | 位置 | 何时动 |
|---|---|---|
| **代码层** | `src/pages/` `src/components/` `src/lib/` | 永不改(fork 一次后不动,升级靠 merge) |
| **配置层** | `src/config/` `src/locales/` `globals.css` `public/` | 每游戏站改一次(站名/主题色/导航/广告位) |
| **内容层** | `src/content/wiki/<locale>/` | 完全替换(现有文章全是 demo 虚构游戏内容) |

**铁律:代码层零游戏相关字符串。** 换游戏只碰配置层+内容层,上游升级时 fork 才能无痛 merge。

---

## 三、目录地图

```
├── src/
│   ├── pages/            # 路由(index / [...slug] / [locale] / landing / tags / 法律页)
│   ├── components/       # 纯 Astro 组件(ads / article / landing / sidebar / mdx / video ...)
│   ├── config/           # 配置层:site.ts·navigation.ts·project.ts·landing-*.ts·affiliates.ts
│   ├── content/wiki/     # 内容层:en/ ja/,各含 bosses·codes·guides·items 四目录
│   ├── locales/          # UI 文案 JSON(en.json / ja.json),组件禁止硬编码文字
│   ├── content.config.ts # Zod schema 硬门禁(category 是 enum,写错 build 失败)
│   └── i18n/             # routing.ts(locales 清单三处一致之一)
├── .agent/skills/        # 6 个建站 skill(见下表)
├── docs/                 # PRD + 运营/开发文档 + handbook 双语手册
│   └── handbook/zh/      # 29 课运营 + 9 课开发 + 3 附录(英文版同目录 en/)
├── scripts/              # 内容/检查 CLI(bulk-new-posts·sync-codes·check-* 等)
├── tools/anvil-ops/      # 独立 npm 包 anvilwiki-ops(CLI+MCP,线上运营)
├── tests/                # Vitest 22 套件
└── wrangler.toml         # Cloudflare Pages env 唯一真相源(存在时 dashboard env 被忽略!)
```

**内容层现状(demo 数据,上线前全部替换)**:`en/` 下 bosses 3 篇 / codes 1 / guides 3 / items 2,共 9 篇。虚构游戏名 **Anvil Quest**。

---

## 四、6 个内置 Skill(`.agent/skills/`)

| Skill | 干什么 | 何时用 |
|---|---|---|
| `anvil-find-keywords` | 挖词选品:多渠道挖候选 → SERP 快验 → 意图/需求打分 → 决策表落盘 gitignored `seo-reports/`(3/7/14/28 天复查) | **第一步**,选哪个游戏 |
| `anvil-new-article` | 从任意素材(笔记/YouTube 视频字幕)生成单篇合规 MDX;事实红线+draft 门控+DMCA 红线 | 日常写文章 |
| `anvil-batch-articles` | 关键词清单 → 意图分类 → `pnpm bulk-new-posts` 脚手架 → 统一提示词灌一批 | 首批 10-15 篇 |
| `anvil-update-codes` | 兑换码新增/过期更新 | 有码游戏日常维护 |
| `anvil-refresh` | 保鲜审计:codes >7 天、分类 >90 天未更新 | 每周运营 |
| `anvil-adsense-audit` | AdSense 申请前 22 项体检(Blocker 未清零不许提交) | 挂广告前 |

配套批量脚本:`pnpm bulk-new-posts`(CSV 建稿)、`pnpm sync-codes`(CSV 同步码)、`pnpm gen-covers`(1200×675 og:image 封面,含 CJK 字体子集)。

---

## 五、常用命令速查

```bash
pnpm dev / build          # 开发 / 构建(build 含 schema 校验+Pagefind 索引)
pnpm check-content        # 内容 lint(H1/内链数/trailing-slash/语言前缀/分类=目录)
pnpm check-config         # 导航·语言三处一致性
pnpm check-links          # build 后跑,dist 内链审计
pnpm check-i18n --strict-ui
pnpm new-post             # 交互式单篇脚手架
pnpm bulk-new-posts       # CSV 批量建稿(--dry-run 预览)
pnpm sync-codes           # CSV 批量同步兑换码
pnpm gen-covers           # 生成封面
pnpm refresh-audit        # 保鲜报告
pnpm apply-template       # ★ 换皮 CLI(15 题问答,--dry-run 预览)
pnpm test:e2e             # apply-template 真实模式端到端
pnpm template-audit       # 模板健康检查(换皮残留)
```

外部包 `anvilwiki-ops`(`cd tools/anvil-ops && pnpm i`):`anvil-ops doctor/metrics/audit/insights/submit`(submit = 校验→分支→PR,永不直推 main)。

---

## 六、英文攻略站搭建路线

英文=默认 locale,是最顺路径(无需处理语言前缀/回退)。

1. **选品** → `anvil-find-keywords` 跑挖词决策表(已定游戏则跳过)
2. **换皮** → `pnpm apply-template`:站名/游戏名/主题色/栏目取舍/语言(只选 en,ja demo 自动清)。⚠️ 它改的是**身份**;demo 9 篇文章内容另行删除重写
3. **内容生产** → 首版 10-15 篇核心页分批上。流量三件套 = Boss 攻略 + 兑换码页 + 新手攻略。红线:**绝不编造游戏事实**(假码毁站),未核实一律 `draft: true`
4. **上线** → push 回 GitHub fork → CF Pages 连仓库自动部署。铁律:**先绑域名 → 改 SITE_URL → 再部署**
5. **收录+变现** → GSC 提交(IndexNow 自动推送) → 内容达标后 `anvil-adsense-audit` → 申请 AdSense

**内容硬规格**(写文章时 agent 必守,详见 `docs/content-format.md`):

- frontmatter:`description` 40-165 字符;`title` ≤80;`summary` 40-60 词直答(Quick Answer 卡+AI Overviews 候选);tags 复用现有词表(grep `tags:`)
- 正文从 H2 起(问题式),永无 H1;内链以 `/` 结尾(trailingSlash: always);非默认语言内链带前缀(英文站无此虑);每篇 ≥3 条内链
- 每篇必配封面(`image`,1200×675,`pnpm gen-covers`);Boss 攻略配 ≥1 视频+2-4 张 gallery
- 完稿后 `pnpm check-content && pnpm build` 双绿才算完

---

## 七、关键红线(违反即返工)

1. UI 文案全走 `src/locales/*.json`,组件不硬编码
2. 主题色只管 globals.css 的 4 个变量(`--brand` 等),禁止硬编码 hex
3. 分类 key 三处一致:`navigation.ts` = `en.json` 的 `nav.<key>` = `src/content/wiki/en/<key>/` 目录名;**先有文章再进导航**
4. 语言三处一致:`routing.ts` = `src/locales/*.json` 文件名 = `src/content/wiki/<locale>/` 目录
5. 广告/评论 env 空值=不渲染,禁止加默认值或硬编码 demo 配置
6. 所有构建期 env 必须进 `wrangler.toml` [vars](存在时它是 Pages env 唯一真相源,dashboard UI 被忽略)
7. UI 不用 emoji,图标用 lucide
8. 任何优化做**全仓一致性扫描**(landing 中英/README/docs/AGENTS/skills/版本号各处同步)
9. 不加 React/Vue/Svelte 运行时(PRD ADR-002);不改 MIT;demo 游戏身份 Anvil Quest 不直接改在本仓库

---

## 八、待定问题

1. ~~目标游戏~~ ✅ 已定 **Graveyard Keeper 2**(2026-09-22 发售,Steam 87% 好评)。素材库 `seo-reports/gk2-materials/`,发布计划见 [CONTENT-PLAN.md](CONTENT-PLAN.md)
2. **目标域名**:是否已购?(影响 apply-template 的 SITE_URL 与「先绑域→改 SITE_URL→再部署」顺序)
3. **变现节奏**:按 CONTENT-PLAN 默认=首发不挂广告,流量达标后过 anvil-adsense-audit 再开
4. **换皮执行位置**:在本仓直接跑 apply-template,还是 fork 到新仓?(涉及 demo 身份红线)

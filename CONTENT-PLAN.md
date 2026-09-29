# Graveyard Keeper 2 Wiki · 内容总计划(全貌 × 排产 × 素材映射)

> 📅 本文件 2026-09-26 按姊妹站 `herosiegehelper/hero-siege-content-plan.md` 格式重写,取代同日初版(三段式简版),一份文档管全:① **游戏内容全貌**与三栏目定位(什么该存在);② **分批搭建日历**(什么时候发、怎么发);③ **素材映射**——每篇待建页挂真实可溯的 YouTube / 官方素材(视频 ID 直达)。
> 站点:**Graveyard Keeper 2 Wiki · 域名待定** · en 单语 · AnvilWiki v2.36.0(Astro 7 + Cloudflare Pages)
> 现状(2026-09-26 核对):**0 篇上线,换皮未执行**——游戏 09-22 刚发售(4 天),B1 前置 = 域名 + apply-template(见 §7 检查单);已定口径:**写完即发**(对齐 Hero Siege 站口径;无官方源的数值用 "community-reported / unverified" 措辞 + `gameVersion: 1.0` 徽章,IG 后核后改)
> 周节奏:周一批内写作 → 周中发布 → 周末 GSC 复盘;周中固定巡检 Steam 新闻区(app 4358690)+ tinyBuild 官方渠道(补丁与更新公告)
> 素材底座:`seo-reports/gk2-materials/`(12 条视频 + 官方 Steam 事实,yt-dlp 通道;youtube-content-gen 式管道:字幕 → 结构化提取 → MDX;索引见 `seo-reports/gk2-materials/MATERIALS.md`)
> 配套文档:`seo-reports/game-pipeline.md`(选品决策,**待建**)· `PROJECT-GUIDE.md`(模板导览)
> 产线技能:anvil-new-article(单页深写,Step 0 视频字幕提取)· anvil-batch-articles(同构批量)· anvil-refresh(保鲜;codes 技能本站不适用)

---

## 一、站点定位与内容模型

### 1.1 定位声明

为 Graveyard Keeper 2 玩家提供**对齐 v1.0(2026-09-22 发售)**的攻略/系统/僵尸军团/物品 wiki——打发售窗口期竞品 wiki 尚未成型的空窗(Steam 87% 特别好评、4 天 1,454 条评测、头部实况单条 117 万播放 = 需求已验证,大型攻略站与 fandom GK2 条目仍处 stub 期;**竞品现状核查待办,2026-10-06 复查**)。

- **不追逐**:初代 Graveyard Keeper 全图鉴内容(GK1 wiki 成熟,复制无意义;只在「对比初代」页引流)
- **主攻**:v1.0 新系统(僵尸军团/塔防/城镇 Emberville 重建/白红骷髅双体系/insanity/mastery)+ 新手开荒 + "is it worth it" 商业词(首发 -20% 折扣期意图最强)
- **诚实文案红线**:不写 "updated daily by community",只写 "Updated for v1.0 (2026-09)"——只承诺能做到的

### 1.2 三板块(+2 暂缓)

| 板块 | 对应游戏的什么内容 | 页面形态(模板能力) | 长期定位 |
|---|---|---|---|
| **Guides** | 玩法攻略主力:新手、mastery/科技点、insanity、星期机制、城镇重建、尸体流水线、经济、对比初代、评测 | 问题式 H2 + 40-60 词 Quick Answer + FAQ + 内链网 | **流量主战场**。发售首月新手词 + 系统词双层,吃最大搜索盘 |
| **Zombies** | 本作招牌系统的全部内容:僵尸制造/强化(器官/红骷髅)/后勤网络/园艺/小队与兵营/过载 debuff/工厂自动化 | 问题式 H2 + 结构化要点卡 + 视频/画廊 | **差异化护城河**。僵尸系统是 GK2 相对初代的最大卖点,独立目录 = 主题权威聚类;竞品散写,我们成体系 |
| **Items** | 物品选择性图鉴:工具梯队、食物与手术、器官、墓园装饰与品质、资源出售、护甲武器与塔防建筑 | 数据卡 + 逐类页 + 用途注记 | **选择性数据库**。不穷举,按 meta 相关性做 10-15 页;与 guides 内链 1:1 挂钩 |
| ⏸ Combat/Bosses | 塔防与敌人名单(官方确认有战斗与塔防,具名 Boss **未验证**) | 暂并入 Guides(combat 标签);触发条件见 §2.4 | 敌人文档 IG 核实 ≥3 个 → 拆独立分类 |
| ⏸ Codes | GK 系列**历史无官方兑换码** | — | 永久不设栏目;官方若发码再开(anvil-update-codes 就绪) |

### 1.3 内容双层模型(非赛季制游戏的适配打法)

GK2 是单机买断制,无赛季循环。双层按**版本补丁**切:

| 层 | 内容 | 维护节奏 | 例子 |
|---|---|---|---|
| **常青层 evergreen** | 机制/系统结构/流程——补丁不改的部分 | 写好即可;补丁触碰才更新 `lastModified` | 白红骷髅是什么、僵尸怎么造、insanity 机制原理、城镇重建流程 |
| **版本层 patch-cycle** | 数值/meta/效率排序——随平衡补丁变 | **每个官方补丁一轮**:刷新数值 + `gameVersion` 徽章 | 工具梯队效率、僵尸强度配置、赚钱路线效率对比 |

**发售流量生命周期**(本站正处 ①→②):① 发售首周(现在!)beginner/tips/worth-it 词峰值,布局最大 → ② 首月(10 月)系统深挖词(僵尸/骷髅/insanity/城镇)长尾积累 → ③ 首个大补丁新词 + 数值刷新(巡检 Steam 新闻触发)→ ④ 长尾:achievements、逐项数据库、GSC 数据回流插队。

### 1.4 保鲜纪律

对齐 `anvil-refresh` 审计:分类 >90 天标过期;**每个官方补丁 = 版本层页面的 `lastModified` 更新点**;因 codes 栏目不存在,>7d 红线不适用(codes 审计规则空转无害)。无赛季预热机制;若官方公布 DLC/大版本,按 Hero Siege 赛季前 2 周预览词模式预埋。

---

## 二、游戏内容全貌(游戏里有什么 → 站上待建什么)

> 图例:素材缩写:**PN** = 官方源(Steam 新闻区 / tinyBuild / IGN 官方 trailer)· **YT** = 素材库视频(括号内为 YouTube 视频 ID,明细见 `seo-reports/gk2-materials/MATERIALS.md`)· **IG** = 进游戏实测(数值终审)。全站已建 0 页,以下均为待建表;批次归属见第四节日历。

### 2.1 Guides(目标 ~25-30 页,流量主战场)

**游戏全貌**:玩家从守墓人升任**大审判官(Grand Inquisitor)**,核心循环 = ① **成长系统**:mastery 等级(A1/A2 双源)、科技点(A1 Tip5)、信仰/布道/waypoints(A1 Tip8);② **尸体流水线**:白骷髅=墓园质量(A3/A4/C2 三源)、手术(蔬菜沙拉 = flawless surgery,A4)、火葬场处理不要的尸体(A4)、按功能分尸(A4);③ **状态与生存**:insanity 用啤酒/睡眠控制(A3/A4)、能量与进食(A3)、星期几影响商店与事件(A1 Tip3);④ **新支柱**:城镇 Emberville 重建 + 城市任务 + 夜警(C2/A1 Bonus)、塔防与要塞(PN/C2/B3);⑤ **经济**:小麦+面包早期(A3)、资源出售与堆叠(A1 Tip9)、任务门控功能解锁(A1 Tip2)+ city liberation(A1 Bonus)。

| 批次 | 页面(目标词) | slug | 素材 |
|---|---|---|---|
| B1 | 新手开荒(graveyard keeper 2 beginner guide) | guides/beginner-guide | YT:A1 Ic0n 10 tips(WMkufDK7bKw)+ A3 GLC 起步(l2EXlN4NbWk) |
| B1 | 赚钱(graveyard keeper 2 money) | guides/money-making-guide | YT:A3(小麦+面包/木材)+ C2(盈利僵尸末日章) |
| B1 | 对比初代(graveyard keeper 2 vs 1) | guides/whats-new-vs-graveyard-keeper-1 | YT:C2 GLC 十件事(x9fokGh_hVw)全章 + PN 官方简介 |
| B1 | 值不值得买(graveyard keeper 2 review) | guides/is-it-worth-it | YT:C3 GLC 评测(5hUTglZ9o4Q)+ C4 概览(LG5HAGcorzc)+ B2 百日挑战(FC0INrD4yQA) |
| B2 | 科技点与 mastery(graveyard keeper 2 tech points) | guides/tech-points-mastery | YT:A1(WMkufDK7bKw Tip1/5) |
| B2 | insanity 机制(graveyard keeper 2 insanity) | guides/insanity-guide | YT:A3(啤酒)+ A4(睡眠)双源 |
| B2 | 星期机制(graveyard keeper 2 days of the week) | guides/day-of-week-calendar | YT:A1 Tip3(单源,**IG 核实后发**) |
| B2 | 城镇重建(graveyard keeper 2 town) | guides/town-rebuilding | YT:A1 Bonus(city liberation)+ C2(城镇真实存在章) |
| B3 | 尸体流水线与火葬场(graveyard keeper 2 corpses) | guides/corpse-management | YT:A4(分尸/火葬场)+ A1 Tip6 |
| B5 | 塔防与战斗(graveyard keeper 2 combat) | guides/tower-defense | PN 官方简介 + YT:C2(塔防章)+ B3 RonEmpire 战斗章(_j8wikbXzrY) |
| B5 | Act 1 walkthrough(graveyard keeper 2 act 1) | guides/act-1-walkthrough | YT:B3(_j8wikbXzrY 含 Act 1 收尾章)|
| B5 | 剧情设定(graveyard keeper 2 story) | guides/story-premise | PN + YT:C2(Gravedigger→Inquisitor 章) |
| B5 | 成就 100%(graveyard keeper 2 achievements) | guides/achievements | YT:B1 Floydson 全成就(N84q1nzOuUw) |
| B6 | 背包与箱柜物流(graveyard keeper 2 storage) | guides/inventory-logistics | YT:A1 Tip4 |
| B6 | 信仰与布道(graveyard keeper 2 sermons) | guides/faith-and-sermons | YT:A1 Tip8 |
| B6 | 性能与设置(graveyard keeper 2 performance) | guides/performance-settings | YT:C3(Graphics/Performance 章) |
| B7 | demo 存档继承(graveyard keeper 2 demo save) | guides/demo-save-carryover | YT:C2(章节证实存在;条件 IG 核) |
| B7 | 主机版差异(graveyard keeper 2 switch/ps5) | guides/console-versions | PN(IGN trailer:PC/PS/Xbox/Switch 全平台) |
| 滚动 | GSC 数据回流插队页(计划外高展示词) | 按 B 队列插队 | GSC |

### 2.2 Zombies(目标 ~8-10 页,差异化护城河;**上线即建分类,B1 配 2 篇**)

**游戏全貌**:僵尸系统是 GK2 相对初代的最大卖点(Zombies 2.0,C2 章)——① **制造链**:造僵尸(A2 专章)、器官与属性(A2)、防腐台与红骷髅(A2)、5 红骷髅+塑尸(A4);② **运营链**:supply station(A2)、僵尸园艺 stand/shovel/tablets(A2)、僵尸当搬运工/装青铜+工具(A3/A4)、**僵尸物流网络**(A4 首条)、僵尸操作工厂的工业级自动化(C2);③ **军事链**:小队/兵营/长枪弓箭(A2)、军队多样化(A4);④ **约束**:僵尸过多 = debuff(A2)、perks 与经验(A2)、mastery 等级联动(A1/A2)。

| 批次 | 页面(目标词) | slug | 素材 |
|---|---|---|---|
| B1 | 僵尸总指南(graveyard keeper 2 zombie guide,**枢纽页**) | zombies/zombie-guide | YT:A2 Ic0n 全章(R1SfY1jXYgw)+ A4 僵尸三 条 |
| B1 | 白骷髅 vs 红骷髅(graveyard keeper 2 red skulls) | zombies/skull-system-explained | YT:A2 + A4 + C2 四源一致(**置信最高页**) |
| B3 | 僵尸物流网络(graveyard keeper 2 zombie logistics) | zombies/logistics-network | YT:A4 首条 + A3 搬运工 |
| B3 | 防腐台与红骷髅强化(graveyard keeper 2 embalming) | zombies/embalming-and-red-skulls | YT:A2 专章 |
| B3 | 僵尸小队与兵营(graveyard keeper 2 zombie squad) | zombies/squads-and-barracks | YT:A2 + A4 军队多样化 |
| B3 | 僵尸园艺与 perks(graveyard keeper 2 zombie farming) | zombies/gardening-and-perks | YT:A2 两章拆合 |
| B7 | 僵尸工厂自动化(graveyard keeper 2 automation) | zombies/factory-automation | YT:C2 + A4(IG 核实规模后发) |
| B7 | 僵尸过载 debuff(graveyard keeper 2 zombie limit) | zombies/overload-debuff | YT:A2 专章(数值 IG 核) |

### 2.3 Items(目标 ~10-15 页,选择性数据库)

**游戏全貌**:不穷举(初代物品全图鉴无意义),按 meta 相关性做——① **工具梯队**:青铜+工具给僵尸(A4),全梯队待 IG 核;② **食物**:能量补给(A3)、蔬菜沙拉→完美手术(A4);③ **器官**:僵尸属性素材(A2);④ **墓园装饰与品质**:maximize cemetery quality(A4);⑤ **资源经济**:出售与堆叠(A1 Tip9);⑥ **军备**:护甲武器打造 + 塔防建筑(PN 官方确认)。

| 批次 | 页面(目标词) | slug | 素材 |
|---|---|---|---|
| B4 | 食物与能量(graveyard keeper 2 food) | items/food-and-energy | YT:A4(沙拉手术)+ A3(进食) |
| B4 | 工具梯队(graveyard keeper 2 tools) | items/tools-tier-list | YT:A4(青铜章)+ **IG 补全梯队**(仅 IG 核实后发) |
| B4 | 器官与僵尸属性(graveyard keeper 2 organs) | items/organs-guide | YT:A2(器官章) |
| B4 | 墓园品质与装饰(graveyard keeper 2 cemetery quality) | items/cemetery-quality | YT:A4(品质条)+ A3(白骷髅条) |
| B6 | 资源与出售(graveyard keeper 2 selling) | items/resources-and-selling | YT:A1 Tip9 |
| B6 | 军备与塔防建筑(graveyard keeper 2 weapons armor) | items/armor-weapons-towers | PN + YT:B3 战斗章(IG 核数值) |
| B8+ | GSC 数据回流:高频物品单页 | 按 B 队列插队 | GSC + IG |

### 2.4 暂缓栏目备忘(触发条件制,不预先建空分类)

| 栏目 | 触发条件 | 动作 |
|---|---|---|
| Combat/Bosses | IG 核实具名敌人/BOSS ≥3 个 | 建 `combat` 分类,迁 guides/tower-defense 入内(_redirects 保 URL) |
| Codes | 官方渠道确认出码(GK 系列历史无码) | 开 codes 页(anvil-update-codes 产线就绪) |

---

## 三、产线与红线

### 3.1 产线映射(哪类页走哪条线)

| 页面类型 | 产线 | 要点 |
|---|---|---|
| 系统深度页、评测、对比、walkthrough、僵尸枢纽页 | **anvil-new-article**(单页深写) | Step 0 视频字幕 → 结构化提取 → MDX;数值红线 |
| 同构批量页(items 分层、achievement 分组若拆) | **anvil-batch-articles**(csv → `pnpm bulk-new-posts` → 统一模板逐篇填 → 全批验收) | 同批反重复(开头句式/小节命名/表头不得模板化复用);清单里无素材支撑的词不做 |
| 周期保鲜 | **anvil-refresh** | 分类 >90d;官方补丁 = 版本层刷新触发器 |

素材优先序:**官方源(Steam 新闻区 / tinyBuild / IGN 官方频道)> 素材库 12 条视频(已核实标题/频道/时长/章节)> 进游戏实测(数值终审)**。

### 3.2 每批标准 SOP

```
1. 写作   anvil-new-article(单页深写)/ 同构批手写+反重复;无官方源数值用 "community-reported / unverified" 措辞
2. 门禁   pnpm check-content && pnpm typecheck && pnpm build && pnpm check-links
3. 封面   pnpm gen-covers(1200×675,自动接线 frontmatter image)
4. 构建   SITE_URL=https://<域名待定> pnpm build
5. 发布   env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY npx wrangler pages deploy
6. 收录   v2.36 IndexNow 已自动化(CI 成功后自动提交);本步仅作手动补推备用:pnpm submit-indexnow
7. 复盘   上线 7 天看 GSC 展示/查询;高展示低点击的页改 title/description
```

### 3.3 红线(违反即废稿)

1. **禁止编造**:数值、掉率、Boss 名单、兑换码——没有官方源/实测就不写定值;写完即发口径下,无官方源的数值用 "community-reported / unverified" 措辞 + `gameVersion: 1.0`。
2. **无 codes 内容**:GK 系列历史无兑换码,任何 "codes" 页都是编造风险,禁止立项。
3. 他人视频字幕只做事实参考,**正文完全重写**;嵌入原视频/官方 trailer 为合规做法,他人实况嵌入须注明出处。wiki/fandom 只作纠错参照,禁止复制文本。
4. 内链只指真实存在的页面;每批后 `check-content` + `build` + `check-links` 三门禁必绿;正文 ≥3 条站内链接,tags 只从词汇表取(现役 11 个:`beginner` `zombies` `systems` `economy` `town` `combat` `items` `review` `tips` `gk2-vs-gk1` `graveyard`)。
5. 缩略图只做 `gen-covers` 视觉参考,不直接使用;自截图/官方 press kit 优先。

---

## 四、分批搭建日历(每批 = 一周)

> 各批页面明细与素材在 §2 各表(按批次列取用)。B3+ 的顺序在每批 GSC 复盘后允许按数据调整。

| 批次 | 周期 | 主题 | 页面构成 | 状态 |
|---|---|---|---|---|
| **B0** | 09-26 起立即 | **建站前置** | apply-template 换皮(栏目=guides+zombies+items,语言 en)+ 删 demo + 品牌资产(§7 检查单;域名/GSC 用户侧待办) | ✅ 2026-09-26 本地完成 |
| **B1** | 换皮完成当周 | **首发热度 7 篇**(发售黄金窗口,每拖一周窗口贬值;items 概览提前投产补空分类) | guides ×4(beginner/money/vs1/worth-it)+ zombies ×2(hub/skulls)+ items ×1(getting-started) | ✅ 2026-09-26 发布就绪 |
| **B2** | 第 2 周 | **系统深化** | guides ×4:tech-points / insanity / day-of-week / town | ✅ 2026-09-26 发布就绪(与 B1 同批) |
| **B3** | 第 3 周 | **僵尸深挖**(护城河周) | zombies ×4:logistics / embalming / squads / gardening-perks + guides corpse-management | ✅ 2026-09-26 发布就绪;zombie-guide 枢纽页深链已回填 |
| **B4** | 第 4 周 | **Items 起步** | items ×4:food / tools / organs / cemetery-quality | ✅ 2026-09-29 发布就绪 |
| **B5** | 第 5 周 | **战斗与进程** | guides ×4:tower-defense / act-1 / story / achievements | ✅ 2026-09-29 发布就绪 |
| **B6** | 第 6 周 | **运营与军备** | guides ×3(inventory/faith/performance)+ items ×2(selling/armor) | 待启动 |
| **B7** | 第 7-8 周 | **补全 Ⅰ**(首月复盘定向) | guides ×2(demo-save/console)+ zombies ×2(factory/overload) | 待启动 |
| **B8+** | 第 9 周+ | **数据回流滚动** | GSC 插队页 + items 深水区;成熟态后转「保鲜 + 按数据扩页」模式 | 待启动 |
| 滚动 | 随时 | 官方补丁 → 版本层页刷新 `lastModified` / 竞品 wiki 复查(10-06)/ 官方 DLC 公告 → 预览词预埋 | §2 各表 | 常态 |

### 成熟态定位说明

B1-B5 跑完 = **24 页**(guides 13 / zombies 6 / items 5 + 首页与列表页),三栏目骨架已成立;B1-B6 跑完 ≈ **29 页**(B6 补 guides ×3 + items ×2)。GK2 是刚发售的单机新游,关键词宇宙比 Hero Siege(22 职业×赛季循环)小,**成熟态诚实预估 ~45-60 页**(B7-B8 补全 + GSC 数据回流),不虚设 90+ 目标。优先级原则不变:每篇立项必须有素材来源与真实搜索意图,不为凑"完整"造薄页。

### 已收口决策

- **`codes` 栏目:不开**(2026-09-26)——GK 系列历史无兑换码,编造风险不可接受;官方发码为唯一重开触发条件(§2.4)。
- **`zombies` 独立分类:上线即建**(2026-09-26)——B1 配 2 篇真文满足「先有文章再进导航」;僵尸是本作最大差异化卖点,独立目录构成主题权威聚类,避免后期迁移的 URL 重置成本。
- **`bosses`/`combat` 分类:暂缓**(2026-09-26)——具名 Boss 未验证;combat 内容首发归 Guides(combat 标签),触发条件见 §2.4。

---

## 五、KPI 与调整机制

- **每批 +7 天**:GSC「效果」看新页展示量与查询词;把"有展示无点击"的页列入 title/description 优化清单
- **每批 +14 天**:对比收录数(GSC 页面索引报告);若某主题收录快、排名升,下一批加码同主题
- **每周**: `anvil-refresh` 保鲜扫描 + Steam 新闻区补丁巡检;balance 改动 = 版本层刷新触发器
- **数据回流**:GSC 查询词中出现计划外的高展示词 → 插队立项(插 B 队列,不另开批次)
- **复查挂钩**:与 `seo-reports/game-pipeline.md`(待建)复查节奏同步;**2026-10-06 复查竞品**(fandom GK2 条目 / 大站攻略覆盖进度)——若竞品快速成型,差异轴从「首发空窗补位」转向「结构化快答 + 僵尸系统纵深」

## 六、总量与优先级总览

| 板块 | 已建 | 待建(按批) | 成熟态 |
|---|---|---|---|
| Guides | **13**(B1 ×4 + B2 ×4 + B3 ×1 + B5 ×4) | B6 ×3 → B7 ×2 → 滚动 | ~25-30 |
| Zombies | **6**(B1 ×2 + B3 ×4) | B7 ×2 | ~8-10 |
| Items | **5**(getting-started 提前投产 + B4 ×4) | B6 ×2 → B8+ 滚动 | ~10-15 |
| Combat/Bosses | 0 | ⏸ 触发条件制(§2.4) | 0-5 |
| Codes | 0 | 永久不设(除非官方发码) | 0 |
| **合计** | **24** | **B6-B8 ≈ +10 → 滚动** | **~45-60** |

执行顺序进展(2026-09-29):素材底座就位(12 视频 + 7 字幕 + 官方事实)→ **B0 换皮完成**(apply-template 18 项答案表 + zombies 分类 + 首页去 demo 化 + 品牌资产生成,`gk2-site` 分支)→ **B1+B2+B3 共 16 篇发布就绪**(2026-09-26)→ **B4+B5 共 8 篇发布就绪**(2026-09-29,全部 935-1093 词、封面 1200×675 已接线、每篇嵌源视频+FAQ)→ **当前 24 篇**,八门禁本地全绿(test 161/161,typecheck 0 错,check-content 24 MDX 干净,check-links 49 页 2019 链接零断链)→ **已上线**(2026-09-29 重发 49 URL sitemap + IndexNow 48 URL 202;8 篇新页逐条 200)→ 刷新度审计 ✅ 24 篇无过期 → **下一步只剩 GSC 门**(用户侧网域验证 + sitemap 提交);之后 B6 按日历推进。

B4+B5 产出与三处偏离记录(必须有据可查,勿在下一批重复):
- **`items/tools-tier-list` 未走 §2.3 的「IG 核实后发」门**(2026-09-29 决定):首发窗口内无 IG 实测条件,若继续压着不发等于把「graveyard keeper 2 tools」这一批首选词整批让给竞品。改以**诚实缺口页**形态发布——正文只写社区已报的 rusty→bronze→iron 方向与 mastery ±1/±2 数值,并显式声明「v1.0 无公开完整梯队,S-F 排名会是虚构,本 wiki 不发虚构」;标题与 description 均标注为「What Is Actually Confirmed」,不冒充梯队结论。IG 核实后应作为**升级**而非重写:补全梯队表并把诚实节降级为脚注。
- **`items/organs-guide` 源字幕缺失**:A2(R1SfY1jXYgw)字幕多次重试仍 HTTP 429(2026-09-26 与 09-29 两轮),改用该视频章节目录骨架 + 另一频道 advanced-tips 覆盖佐证,hedge 强度为本批最高(每节带「community-reported」),并在正文开头显式声明「官方材料未展开,以下按社区报道读」。
- **`guides/act-1-walkthrough` 无官方幕次结构**:v1.0 无官方 Act 划分,该页按「某位首发周 100% 通关玩家的解锁顺序」重构,并在正文与 FAQ 两处声明「非官方幕次」;demo 的「Trigger the End of Act 1」仅作为观察信号引用且标注为 demo 切片。
- **`guides/story-premise` / `guides/achievements` 同为社区单源**:`Emberville` 等地名沿用既有 `town-rebuilding` 页的同一 hedge口径(社区报道非官方);成就名来自首发周 100% 通关视频逐条转录(17 项),未在游戏内二次核实,均标 community-reported。
- 本批顺手修:`wrangler.toml` 重复 `pages_build_output_dir` 键(非法 TOML,上一批文本编辑残留);2 处**内部流程泄漏**成正文(tools 页曾写「本页被标记待游戏内核实」、organs 页曾写「该视频字幕未抓到」)——已改写为面向读者的语言。**新批质检项:成稿后全文 grep 一次「本页/我们/字幕/核实流程」类自指词。**

## 七、B0 启动前一次性检查(2026-09-26 列,做完勾掉)

- [x] **域名定案**——2026-09-26 先用占位域 `graveyardkeeper2.app` 完成换皮(未部署无 SEO 影响);正式购入后全局替换该域(wrangler.toml SITE_URL + site.ts domain 两处)+ Cloudflare 绑定,再走「先绑域→改 SITE_URL→再部署」
- [x] **换皮执行位置**——2026-09-26 定为本仓新分支 `gk2-site`(main 保持模板原样可回退/可对照;如需独立仓库,推该分支即可)
- [x] apply-template 答案表——`gk2-apply-answers.json`(18 项:游戏名 Graveyard Keeper 2/短名 GK2/主题色 #4e7a3a 苔绿/栏目=guides+items→手工加 zombies/en 单语/清 demo/首页 preset 1/删 landing)
- [x] **git 提交整树**——2026-09-26 B0-B3 全部内容统一提交到 `gk2-site` 分支
- [x] **fork 测试口径收口**——上游 8 个模板元测试(断言 demo 态/landing/ja,换皮后必然红)移入 `tests/template-meta/` 并从 vitest+tsconfig 排除(不删除,保上游 merge 可解析);url/tags/seo/content-utils/routing-flags/home-ui 六个 fork 相关套件改为 en 单语口径修复;`pnpm test` 161/161 绿。fork 契约(见 scripts/e2e-apply-template.mjs)=build+check-config 绿,测试套件非 fork 承诺项
- [x] **部署上线**——2026-09-26 CF Pages 直传 + 真域 graveyardkeeper2.app 绑定生效(zone active/DNS CNAME/证书签发全自动链路),线上四项 200;IndexNow 首推 40 URL(202)。**2026-09-29 B4+B5 上线后重发:49 URL sitemap / IndexNow 48 URL(202),8 篇新页逐条 200**,canonical/og:image 抽验正确(⚠️ 直传部署无 git-connected CI,v2.36 IndexNow 自动化不生效——每次部署后手动 `pnpm submit-indexnow --site` 是唯一通道)
- [ ] GSC 确认——资源验证 + sitemap 提交(需用户 Google 账号操作;之后可接 anvil-ops 的 GSC 集成);`PUBLIC_CF_BEACON_TOKEN` 建议一并填上开 CF Web Analytics
- [x] 换皮后删 demo 文章——apply-template 清 11 篇 demo 文+24 个 demo 资产+45 个 landing 文件;ja 目录残留 .gitkeep 已删
- [x] zombies 分类手工落地——navigation.ts(en.json nav+overview 同步)+ `src/content/wiki/en/zombies/` 目录;check-config 绿
- [x] 首页去 codes/bosses 化——en.json hero/start/explore/faq 四模块重写(FAQ 含「无官方兑换码」诚实口径)
- [x] 品牌资产——`pnpm gen-assets` 按新品牌色重生成 favicon 全套+hero.webp(图标形状仍为模板默认,自定义图标=用户侧任务)

## 八、与其他文档的关系

- `seo-reports/gk2-materials/MATERIALS.md`:12 条视频完整表(本文件只挂每页主素材 ID)+ 官方 Steam/IGN 事实锚点 + 话题→证据映射 + 字幕留存状态
- `seo-reports/gk2-materials/meta/` + `transcripts/`:yt-dlp 原始留存(元数据 JSON + 7 份英文字幕)
- `PROJECT-GUIDE.md`:AnvilWiki 模板导览(三层架构/六 skill/命令速查/红线)
- `seo-reports/game-pipeline.md`:选品决策管理表(**待建**,GK2 入选依据与复查日)

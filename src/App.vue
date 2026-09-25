<template>
  <div class="site-shell" :data-device="deviceType">
    <header class="topbar">
      <div class="brand-wrap">
        <div class="brand-mark">春</div>
        <div class="brand-text">
          <span class="brand-cn">春秋GIS</span>
          <small class="brand-en">SpringAutumn GIS</small>
        </div>
      </div>
      <nav class="nav" aria-label="主导航">
        <a v-if="config.page.showAbout" href="#about">关于</a>
        <a v-if="config.page.showEngineDemo" href="#engine">引擎</a>
        <a v-if="config.page.showArticles" href="#articles">文章</a>
        <a v-if="config.page.showTechnology" href="#technology">技术</a>
        <a v-if="config.page.showNotes" href="#notes">笔记</a>
      </nav>
      <div class="nav-actions">
        <template v-if="authReady && user">
          <span class="account-name" :title="`账户 ${user.username}`">{{ user.username }}</span>
          <button class="ghost-btn compact-btn" type="button" @click="accountOpen = true">账户管理</button>
          <button class="ghost-btn compact-btn" type="button" :disabled="authBusy" @click="signOut">退出</button>
        </template>
        <button v-else class="ghost-btn compact-btn" type="button" @click="authOpen = true">登录 / 注册</button>
        <button class="primary-btn engine-btn" type="button" @click="scrollToSection('engine')">查看引擎</button>
      </div>
    </header>

    <main>
      <section v-if="config.page.showHero" class="hero section-shell">
        <div class="hero-bg" aria-hidden="true">
          <span class="orb orb-a"></span>
          <span class="orb orb-b"></span>
          <span class="orb orb-c"></span>
          <div class="grid-overlay"></div>
          <div class="map-overlay"></div>
        </div>

        <div class="hero-content">
          <div class="eyebrow">历史地理 · GIS 技术整理 · 个人研究笔记</div>
          <h1>
            关注历史，<span>关注地理信息科学</span>
          </h1>
          <p class="lede">
            SpringAndAutumnGIS 是一个基于 WGS84 三维经纬网、地形高度、地图渲染
            与空间分析能力组合的轻量引擎研究与展示平台，聚焦历史地理信息与 GIS 技术沉淀。
          </p>
          <div class="cta-row">
            <button class="primary-btn" type="button" @click="scrollToSection('engine')">查看引擎演示</button>
            <button class="secondary-btn" type="button" @click="scrollToSection('notes')">阅读技术笔记</button>
          </div>
        </div>

        <div class="hero-panel">
          <div class="stamp">春秋</div>
          <div class="mini-card">
            <span class="mini-tag">实时能力</span>
            <h3>3D GIS Engine</h3>
            <ul>
              <li>WGS84 三维经纬网</li>
              <li>Terrain-RGB 高程解码</li>
              <li>Web Mercator/XYZ</li>
            </ul>
          </div>
        </div>
      </section>

      <section v-if="config.page.showAbout" id="about" class="trust section-shell">
        <div class="section-header">
          <span class="kicker">About</span>
          <h2>从历史地理到时空可视化</h2>
        </div>
        <div class="about-copy">
          <p>这里记录我对历史地理、地图表达和地理信息科学的长期学习与实践。</p>
          <p>从资料整理、坐标转换到三维渲染，尽量把可以复用的思路、代码和判断写下来。</p>
        </div>
      </section>

      <section v-if="config.page.showEngineDemo" id="engine" class="engine section-shell">
        <div class="section-header align-left">
          <span class="kicker">Engine Demo</span>
          <h2>真实 3D GIS 引擎展示</h2>
        </div>
        <div class="demo-frame">
          <div class="demo-toolbar">
            <span>SpringAndAutumnGIS 实时演示</span>
            <a :href="githubUrl" target="_blank" rel="noreferrer">查看引擎源码</a>
          </div>
          <GlobeDemo v-if="config.page.showEngineDemo" />
          <div v-else class="demo-placeholder">
            引擎演示已按配置关闭，当前仅展示页面结构与设计样式。
          </div>
        </div>
      </section>

      <section v-if="config.page.showArticles" id="articles" class="works section-shell">
        <div class="section-header">
          <span class="kicker">Articles</span>
          <h2>我的文章</h2>
        </div>
        <div class="card-grid works-grid">
          <article class="feature-card" v-for="item in articles" :key="item.title">
            <div class="card-image" :style="{ background: item.bg }"></div>
            <div class="card-body">
              <span class="tag">{{ item.tag }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </article>
        </div>
      </section>

      <section v-if="config.page.showTechnology" id="technology" class="technology section-shell">
        <div class="section-header">
          <span class="kicker">Technology</span>
          <h2>我的技术</h2>
        </div>
        <div class="technology-list">
          <article v-for="item in technologies" :key="item.title" class="technology-item">
            <span class="technology-index">{{ item.index }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </article>
        </div>
      </section>

      <section v-if="config.page.showNotes" id="notes" class="notes section-shell">
        <div class="section-header">
          <span class="kicker">Notes</span>
          <h2>历史地理个人笔记与技术整理</h2>
        </div>
        <div class="notes-list">
          <article class="note-item" v-for="item in notes" :key="item.title">
            <span class="note-date">{{ item.date }}</span>
            <div class="note-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.summary }}</p>
            </div>
          </article>
        </div>
      </section>
    </main>

    <footer v-if="config.page.showFooterContact" class="footer">
      <div class="footer-grid">
        <div>
            <div class="brand-wrap footer-brand">
            <div class="brand-mark">春</div>
            <div class="brand-text">
              <span class="brand-cn">春秋GIS</span>
              <small class="brand-en">SpringAutumn GIS</small>
            </div>
          </div>
          <p>关注历史，关注地理信息科学。以 GIS 技术承载历史地理信息的研究、展示与可视化探索。</p>
        </div>
        <div>
          <h4>导航</h4>
          <ul>
            <li><a href="#about">关于</a></li>
            <li><a href="#engine">引擎</a></li>
            <li><a href="#articles">文章</a></li>
            <li><a href="#technology">技术</a></li>
            <li><a href="#notes">笔记</a></li>
          </ul>
        </div>
        <div>
          <h4>联系</h4>
          <ul>
            <li>{{ config.site.contact.name }}</li>
            <li>{{ config.site.contact.email }}</li>
            <li>{{ config.site.contact.phone }}</li>
          </ul>
          <a class="github-support" :href="githubUrl" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .6a11.4 11.4 0 0 0-3.6 22.2c.57.1.78-.25.78-.55v-2.1c-3.18.7-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.54-.29-5.2-1.27-5.2-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.14 1.17A10.9 10.9 0 0 1 12 6.05c.97 0 1.94.13 2.85.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.4-2.67 5.36-5.22 5.65.41.36.78 1.07.78 2.16v3.2c0 .3.2.66.79.55A11.4 11.4 0 0 0 12 .6Z" /></svg>
            <span>引擎技术支持</span>
          </a>
        </div>
      </div>
      <div class="copyright">© 2026 SpringAutumn GIS · 备案号：{{ config.site.contact.record }}</div>
    </footer>
    <AuthDialog v-if="authOpen" :device-type="deviceType" @close="authOpen = false" />
    <AccountDialog v-if="accountOpen && user" :user="user" @close="accountOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AuthDialog from './components/AuthDialog.vue';
import AccountDialog from './components/AccountDialog.vue';
import GlobeDemo from './components/GlobeDemo.vue';
import { useAuth } from './composables/useAuth';
import { useDeviceType } from './composables/useDeviceType';
import siteConfig from './config/site.config.json';

const config = siteConfig;

const githubUrl = 'https://github.com/xiangsongwen00/SpringAndAutumnGIS.git';
const authOpen = ref(false);
const accountOpen = ref(false);
const { deviceType } = useDeviceType();
const { user, ready: authReady, busy: authBusy, restore, signOut } = useAuth();

onMounted(restore);

const articles = [
  {
    title: '古地图如何进入数字地图',
    tag: '历史地理',
    desc: '记录古舆图、州郡界线与历史文献在数字空间中的整理和表达方法。',
    bg: 'linear-gradient(135deg, rgba(91,192,235,0.7), rgba(14,124,147,0.35))'
  },
  {
    title: '行政区划变迁的地图表达',
    tag: '时空分析',
    desc: '从时间轴、空间关系和资料来源出发，整理行政区划变迁的可视化思路。',
    bg: 'linear-gradient(135deg, rgba(76,159,112,0.7), rgba(14,124,147,0.3))'
  },
  {
    title: '地方志中的空间信息',
    tag: '地方志',
    desc: '尝试把地方志文献、村落信息与空间坐标放在同一张可阅读的地图中。',
    bg: 'linear-gradient(135deg, rgba(242,166,90,0.65), rgba(14,124,147,0.35))'
  }
];

const technologies = [
  { index: '01', title: 'WGS84 三维经纬网', desc: '关注椭球坐标、相机距离与 LOD 调度之间的关系。' },
  { index: '02', title: '瓦片与地形数据', desc: '整理 XYZ / WMTS、Terrain-RGB 解码以及祖先瓦片回退。' },
  { index: '03', title: 'Vue 与 WebGL 实践', desc: '用 Vue 组织页面，用 Three.js 和自研引擎验证三维地图交互。' }
];

const notes = [
  {
    date: '2026-09-01',
    title: 'WGS84 三维经纬网 LOD 与球面细节调度',
    summary: '总结经纬网分层、屏幕空间误差、瓦片选择与渲染性能控制的工程化思路。'
  },
  {
    date: '2026-08-21',
    title: 'Terrain-RGB 高程解码与祖先瓦片回退策略',
    summary: '梳理高程解码、地形贴合和过渡层处理的实践方案，适合历史地理数据叠加。'
  },
  {
    date: '2026-08-06',
    title: '历史地图与 GIS 技术的交叉表达：从文献到空间叙事',
    summary: '围绕古地图、地方志、时空分析题材，整理可视化叙事的设计与实现路径。'
  }
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

</script>

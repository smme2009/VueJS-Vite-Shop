<template>
  <div class="bg-surface text-on-surface flex min-h-screen">
    <MgmtSidebar />
    <main class="flex-1 flex flex-col min-w-0 bg-surface">
      <!-- TopAppBar -->
      <header class="fixed top-0 right-0 left-64 z-30 bg-surface/80 backdrop-blur-xl h-16 flex items-center justify-between px-8 border-b border-outline-variant/10">
        <div class="flex items-center gap-4">
          <h1 class="text-lg font-bold font-manrope tracking-tight text-on-surface">概覽</h1>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative hidden md:flex items-center">
            <span class="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]" data-icon="search">search</span>
            <input class="pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded-md text-sm w-64 focus:ring-1 focus:ring-primary/30" placeholder="搜尋數據..." type="text"/>
          </div>
          <div class="flex items-center gap-4 text-on-surface-variant">
            <button class="hover:opacity-70 transition-opacity relative">
              <span class="material-symbols-outlined" data-icon="notifications">notifications</span>
              <span class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
            </button>
            <button class="hover:opacity-70 transition-opacity">
              <span class="material-symbols-outlined" data-icon="person">person</span>
            </button>
          </div>
        </div>
      </header>
      <!-- Main Content Area -->
      <div class="mt-16 p-8 overflow-y-auto">
        <!-- Dashboard Header -->
        <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 class="text-3xl font-black font-manrope tracking-tighter text-on-surface mb-1">管理控制台</h2>
            <p class="text-on-surface-variant text-sm">歡迎回來。這是 <span class="text-primary font-bold">coord</span> 今天的營運狀況。</p>
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-surface-container-high text-on-surface text-xs font-bold rounded-md hover:bg-surface-container-highest transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
              過去 30 天
            </button>
            <button class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-md hover:opacity-90 transition-opacity flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]" data-icon="download">download</span>
              匯出報表
            </button>
          </div>
        </div>
        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <!-- Metric 1 -->
          <div class="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between shadow-[0_20px_50px_rgba(25,28,29,0.03)] group">
            <div class="flex justify-between items-start mb-4">
              <div class="p-2 bg-primary-container/10 rounded-lg text-primary">
                <span class="material-symbols-outlined" data-icon="payments">payments</span>
              </div>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+0.0%</span>
            </div>
            <div>
              <p class="text-xs font-medium text-on-surface-variant mb-1 uppercase tracking-widest text-nowrap">總銷售額</p>
              <h3 class="text-2xl font-extrabold font-manrope">$40,000.00</h3>
            </div>
          </div>
          <!-- Metric 2 -->
          <div class="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between shadow-[0_20px_50px_rgba(25,28,29,0.03)] group">
            <div class="flex justify-between items-start mb-4">
              <div class="p-2 bg-secondary-container/10 rounded-lg text-secondary">
                <span class="material-symbols-outlined" data-icon="group">group</span>
              </div>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+0.0%</span>
            </div>
            <div>
              <p class="text-xs font-medium text-on-surface-variant mb-1 uppercase tracking-widest text-nowrap">活躍用戶</p>
              <h3 class="text-2xl font-extrabold font-manrope">128</h3>
            </div>
          </div>
          <!-- Metric 3 -->
          <div class="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between shadow-[0_20px_50px_rgba(25,28,29,0.03)] group">
            <div class="flex justify-between items-start mb-4">
              <div class="p-2 bg-tertiary-container/10 rounded-lg text-tertiary">
                <span class="material-symbols-outlined" data-icon="inventory">inventory</span>
              </div>
              <span class="text-[10px] font-bold text-error bg-error-container/20 px-2 py-0.5 rounded-full">2 筆</span>
            </div>
            <div>
              <p class="text-xs font-medium text-on-surface-variant mb-1 uppercase tracking-widest text-nowrap">待處理訂單</p>
              <h3 class="text-2xl font-extrabold font-manrope">2</h3>
            </div>
          </div>
          <!-- Metric 4 -->
          <div class="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between shadow-[0_20px_50px_rgba(25,28,29,0.03)] group">
            <div class="flex justify-between items-start mb-4">
              <div class="p-2 bg-primary-container/10 rounded-lg text-primary">
                <span class="material-symbols-outlined" data-icon="add_box">add_box</span>
              </div>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">4 筆</span>
            </div>
            <div>
              <p class="text-xs font-medium text-on-surface-variant mb-1 uppercase tracking-widest text-nowrap">新上架商品</p>
              <h3 class="text-2xl font-extrabold font-manrope">4</h3>
            </div>
          </div>
        </div>
        <!-- Performance & Activity Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Sales Performance Chart -->
          <div class="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_50px_rgba(25,28,29,0.03)]">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-lg font-bold font-manrope tracking-tight">銷售表現</h3>
              <div class="flex gap-4">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-primary"></span>
                  <span class="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">本週</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-surface-container-highest"></span>
                  <span class="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">上週</span>
                </div>
              </div>
            </div>
            <!-- Chart Visualization -->
            <div class="h-64 flex items-end justify-between gap-2 px-2">
              <div class="flex-1 bg-surface-container-low rounded-t-lg relative h-[80%] group cursor-pointer hover:bg-surface-container-high transition-colors">
                <div class="absolute bottom-0 w-full bg-primary/40 h-[80%] rounded-t-lg"></div>
              </div>
              <div class="flex-1 bg-surface-container-low rounded-t-lg relative h-[80%] group cursor-pointer hover:bg-surface-container-high transition-colors">
                <div class="absolute bottom-0 w-full bg-primary/40 h-[80%] rounded-t-lg"></div>
              </div>
              <div class="flex-1 bg-surface-container-low rounded-t-lg relative h-[80%] group cursor-pointer hover:bg-surface-container-high transition-colors">
                <div class="absolute bottom-0 w-full bg-primary/40 h-[80%] rounded-t-lg"></div>
              </div>
              <div class="flex-1 bg-surface-container-low rounded-t-lg relative h-[80%] group cursor-pointer hover:bg-surface-container-high transition-colors">
                <div class="absolute bottom-0 w-full bg-primary h-[80%] rounded-t-lg"></div>
              </div>
              <div class="flex-1 bg-surface-container-low rounded-t-lg relative h-[80%] group cursor-pointer hover:bg-surface-container-high transition-colors">
                <div class="absolute bottom-0 w-full bg-primary h-[80%] rounded-t-lg shadow-[0_-5px_15px_rgba(0,81,69,0.2)]"></div>
              </div>
              <div class="flex-1 bg-surface-container-low rounded-t-lg relative h-[80%] group cursor-pointer hover:bg-surface-container-high transition-colors">
                <div class="absolute bottom-0 w-full bg-primary h-[80%] rounded-t-lg"></div>
              </div>
              <div class="flex-1 bg-surface-container-low rounded-t-lg relative h-[80%] group cursor-pointer hover:bg-surface-container-high transition-colors">
                <div class="absolute bottom-0 w-full bg-primary h-[80%] rounded-t-lg shadow-[0_-5px_15px_rgba(0,81,69,0.2)]"></div>
              </div>
            </div>
            <div class="flex justify-between mt-4 px-2 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
              <span>週一</span>
              <span>週二</span>
              <span>週三</span>
              <span>週四</span>
              <span>週五</span>
              <span>週六</span>
              <span>週日</span>
            </div>
          </div>
          <!-- Recent Activity Feed -->
          <div class="bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_50px_rgba(25,28,29,0.03)]">
            <h3 class="text-lg font-bold font-manrope tracking-tight mb-8">近期動態</h3>
            <div class="space-y-6">
              <!-- Activity Item -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px] text-primary" data-icon="shopping_bag">shopping_bag</span>
                </div>
                <div>
                  <p class="text-sm font-medium"><span class="font-bold">新訂單</span> #8492 已建立。</p>
                  <p class="text-xs text-on-surface-variant">2 分鐘前</p>
                </div>
              </div>
              <!-- Activity Item -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px] text-tertiary" data-icon="inventory">inventory</span>
                </div>
                <div>
                  <p class="text-sm font-medium"><span class="font-bold">庫存警示</span>：測試商品庫存低。</p>
                  <p class="text-xs text-on-surface-variant">45 分鐘前</p>
                </div>
              </div>
              <!-- Activity Item -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px] text-primary" data-icon="shopping_bag">shopping_bag</span>
                </div>
                <div>
                  <p class="text-sm font-medium"><span class="font-bold">新訂單</span> #8493 已建立。</p>
                  <p class="text-xs text-on-surface-variant">2 小時前</p>
                </div>
              </div>
              <!-- Activity Item -->
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px] text-tertiary" data-icon="inventory">inventory</span>
                </div>
                <div>
                  <p class="text-sm font-medium"><span class="font-bold">庫存警示</span>：測試商品庫存低。</p>
                  <p class="text-xs text-on-surface-variant">5 小時前</p>
                </div>
              </div>
            </div>
            <button class="w-full mt-10 py-3 bg-surface-container-low text-on-surface-variant text-xs font-bold rounded-md hover:bg-surface-container-high transition-colors uppercase tracking-widest">
              查看所有動態
            </button>
          </div>
        </div>
        <!-- Product Performance Grid -->
        <div class="mt-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold font-manrope tracking-tight">熱銷商品排行</h3>
            <a class="text-primary text-sm font-bold hover:underline" href="#">查看完整目錄</a>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <!-- Product Card -->
            <div class="bg-surface-container-lowest overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(25,28,29,0.02)] group border border-transparent hover:border-primary/10 transition-all">
              <div class="h-40 relative">
                <img alt="測試商品" class="w-full h-full object-cover" :src="defaultImage"/>
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary">測試狀態</div>
              </div>
              <div class="p-4">
                <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">測試分類</p>
                <h4 class="font-bold text-sm mb-2">測試商品</h4>
                <div class="flex justify-between items-end">
                  <p class="text-sm font-black">$100.00</p>
                  <p class="text-[10px] text-emerald-600 font-bold">本月銷售 100 件</p>
                </div>
              </div>
            </div>
            <!-- Product Card -->
            <div class="bg-surface-container-lowest overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(25,28,29,0.02)] group border border-transparent hover:border-primary/10 transition-all">
              <div class="h-40 relative">
                <img alt="測試商品" class="w-full h-full object-cover" :src="defaultImage"/>
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary">測試狀態</div>
              </div>
              <div class="p-4">
                <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">測試分類</p>
                <h4 class="font-bold text-sm mb-2">測試商品</h4>
                <div class="flex justify-between items-end">
                  <p class="text-sm font-black">$100.00</p>
                  <p class="text-[10px] text-emerald-600 font-bold">本月銷售 100 件</p>
                </div>
              </div>
            </div>
            <!-- Product Card -->
            <div class="bg-surface-container-lowest overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(25,28,29,0.02)] group border border-transparent hover:border-primary/10 transition-all">
              <div class="h-40 relative">
                <img alt="測試商品" class="w-full h-full object-cover" :src="defaultImage"/>
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary">測試狀態</div>
              </div>
              <div class="p-4">
                <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">測試分類</p>
                <h4 class="font-bold text-sm mb-2">測試商品</h4>
                <div class="flex justify-between items-end">
                  <p class="text-sm font-black">$100.00</p>
                  <p class="text-[10px] text-emerald-600 font-bold">本月銷售 100 件</p>
                </div>
              </div>
            </div>
            <!-- Product Card -->
            <div class="bg-surface-container-lowest overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(25,28,29,0.02)] group border border-transparent hover:border-primary/10 transition-all">
              <div class="h-40 relative">
                <img alt="測試商品" class="w-full h-full object-cover" :src="defaultImage"/>
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-primary">測試狀態</div>
              </div>
              <div class="p-4">
                <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">測試分類</p>
                <h4 class="font-bold text-sm mb-2">測試商品</h4>
                <div class="flex justify-between items-end">
                  <p class="text-sm font-black">$100.00</p>
                  <p class="text-[10px] text-emerald-600 font-bold">本月銷售 100 件</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MgmtFooter />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import defaultImage from '@/assets/default.png'
import MgmtFooter from '@/views/mgmt/layout/footer.vue'
import MgmtSidebar from '@/views/mgmt/layout/sidebar.vue'
</script>

<template>
    <div class="h-full">
        <div class="h-20">
            <Header />
        </div>
        <div class="h-full">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/shop/layout/default/Header.vue";
</script>

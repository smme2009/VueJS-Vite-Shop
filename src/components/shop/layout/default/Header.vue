<template>
    <div class="h-full flex items-center">
        <div class="w-1/4 flex justify-end">
            <span
                class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-sky-500"
            >
                COORD
            </span>
        </div>
        <div class="w-2/4 flex justify-center">
            <el-input
                class="!w-1/2"
                suffix-icon="Search"
                placeholder="搜尋商品"
            />
        </div>
        <div class="w-1/4 flex justify-start">
            <div class="flex">
                <el-button type="warning" icon="User" circle />
                <el-button type="warning" icon="ShoppingCart" circle />
            </div>
        </div>
    </div>
</template>

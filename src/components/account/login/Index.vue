<template>
    <div id="login-form">
        <LoginForm />
    </div>
</template>

<style lang="scss" scoped>
#login-form {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script setup>
import LoginForm from '@/components/account/login/Form.vue';
</script>
<template>
    <div
        class="absolute bottom-0 left-0 right-0 py-4 text-on-primary-500 flex flex-col px-12 gap-1 items-center md:items-start justify-end"
    >
        <div class="flex gap-2">
            <a
                class="credit-link"
                title="Github"
                :href="contacts.githubUrl"
                ><PhGithubLogo />
            </a>
            <a
                class="credit-link"
                title="Linkedin"
                :href="contacts.linkedinUrl"
                ><PhLinkedinLogo />
            </a>
            <a
                class="credit-link"
                title="Instagram"
                :href="contacts.instagramUrl"
                ><PhInstagramLogo />
            </a>
            <a
                class="credit-link"
                title="Email"
                :href="`mailto:${contacts.email}`"
                ><PhEnvelope />
            </a>
        </div>
        <span class="font-bold">{{ contacts.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { contacts } from '@/data/contact-info';
import {
    PhEnvelope,
    PhGithubLogo,
    PhInstagramLogo,
    PhLinkedinLogo
} from '@phosphor-icons/vue';
</script>

<style>
.credit-link {
    @apply rounded-full border border-primary-500 p-2 bg-primary-container-500 shadow-sm;
}
.credit-link * {
    @apply h-6 w-6 text-primary-500;
}
</style>

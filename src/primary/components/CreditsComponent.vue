<template>
    <div
        class="absolute bottom-0 left-0 right-0 py-4 text-on-primary-500 flex flex-col px-12 gap-1 items-center md:items-start justify-end"
    >
        <div class="flex gap-2">
            <a
                class="rounded-full border border-on-primary-500 p-1"
                :href="contacts.githubUrl"
                ><PhGithubLogo class="h-6 w-6"
            /></a>
            <a
                class="rounded-full border border-on-primary-500 p-1"
                :href="contacts.linkedinUrl"
            >
                <PhLinkedinLogo class="h-6 w-6" />
            </a>
            <a
                class="rounded-full border border-on-primary-500 p-1"
                :href="contacts.instagramUrl"
                ><PhInstagramLogo class="h-6 w-6"
            /></a>
            <a
                class="rounded-full border border-on-primary-500 p-1"
                :href="`mailto:${contacts.email}`"
                ><PhEnvelope class="h-6 w-6"
            /></a>
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

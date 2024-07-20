<template>
    <header class="flex justify-between border-b border-slate-200 px-16 py-4 shadow-lg bg-white">
    <div class="flex items-center gap-4">
        <img src="./../../images/Logo.png" class="w-32" alt="Logo" />
        <div>
            <h2 class="text-2xl font-bold uppercase text-orange-500">Smart Shop</h2>
            <p class="text-slate-500">Sifat va Tezkor Yetkazib</p>
        </div>
    </div>

    <div class="flex items-center">
        <ul class="flex items-center gap-4 cursor-pointer">
            <li class="text-lg text-slate-700 font-semibold uppercase hover:text-blue-600 transition">
                <router-link :to="{ name: 'katigoriya' }">Katigoriya</router-link>
            </li>
            <li class="text-lg text-slate-700 font-semibold uppercase hover:text-blue-600 transition">
                <router-link :to="{name:'mahsulotlar'}">MAHSULOTLAR</router-link>
            </li>
        </ul>
    </div>

    <ul class="flex items-center gap-8">
        
        <li class="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer transition uppercase font-bold">
            <i class="fa-solid fa-user text-2xl"></i>
            <router-link :to="{name: 'login'}">login out</router-link>
        </li>
    </ul>
</header>
</template>
<template>
    <VAppBar>
        <VAppBarTitle>Songliste</VAppBarTitle>
            <VToolbarItems>
                <VBtn to="/">Home</VBtn>
            <VBtn to="/new-song">Neues Lied hinzufügen</VBtn>
        </VToolbarItems>
    </VAppBar>

    <VMain>
        <RouterView/>
    </VMain>
</template>
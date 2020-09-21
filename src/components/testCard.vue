<template>
    <span>
        <div>
            {{this.cardType}}
        </div>
        <div>
            {{this.cardStyle}}
        </div>
        <div>
            {{this.cardId}}
        </div>
        <div>
            {{this.cardKey}}
        </div>
        <div>
            {{this.cardPosition}}
        </div>
        <div>
            {{this.gridCss}}
        </div>
        <div>
            {{this.cardProperties}}
        </div>


    </span>

</template>

<script>
    export default {
        name: "testCard",
        props: {
            cardType: {
                type: String,
                required: true
            },
            cardStyle: {
                type: String,
                required: true
            },
            cardId: {
                type: String,
                required: true
            },
            cardKey:{
                type: String,
                required: true
            },
            cardPosition: {
                type: Array,
                required: true
            },
            gridCss: {
                type: String,
                required: true
            },
            cardProperties: {
                type: String,
                required: false
            },
            displayStatus:{
                type: Boolean,
                required: false
            }
        },
    }
</script>

<style scoped>

</style>

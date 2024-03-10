<script setup lang="ts">
import {ref} from "vue";
import {type Workout} from "@/model/workouts";
import "@fortawesome/fontawesome-free/css/all.css";

const isHidden = ref(false);
const workout = defineProps<Workout>();

function distanceFormat(distance?: number): string {
    if(!distance) return "0ft";
    if(distance >= 5280) return (distance / 5280).toFixed(2) + "mi";
    return distance + "ft";
}

function durationFormat(duration?: number): string {
    if(!duration) return "0m";
    const hours = Math.floor(duration / 60);
    const hoursString = hours < 10 ? "0" + hours : hours;
    const minutes = duration % 60;
    const minutesString = minutes < 10 ? "0" + minutes : minutes;
    return hoursString + ":" + minutesString;
}

function howLongAgo( time: number): string {
    const now = new Date();

    const then = new Date(time);
    const diff = now.getTime() - then.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    let retString: string;
    if (years > 0) retString = years + "y";
    else if (months > 0) retString = months + "m";
    else if (weeks > 0) retString = weeks + "w";
    else if (days > 0) retString = days + "d";
    else if (hours > 0) retString = hours + "h";
    else if (minutes > 0) retString = minutes + "m";
    else retString = seconds + "s";
    return retString + " ago";
}

function imageProcess(image: string): string {
    if (!image) return "/l10nFitnessIcon.png";
    return image;
}


</script>

<template>
    <div class="box dcs" :class="isHidden && 'is-hidden'">
        <article class="media dcs">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img :src="imageProcess(workout.user.image)"  alt="Image">
                </figure>
            </div>
            <div class="media-content dcs">
                <div class="content dcs">
                    <p>
                        <span class="dcs has-text-weight-bold">{{ workout.user.firstName }} {{ workout.user.lastName }}</span>
                        &nbsp;
                        <small class="soft-color">@{{ workout.user.username }}</small>
                        &nbsp;
                        <small class="soft-color">{{ howLongAgo( workout.time) }}</small>
                        <br>
                        {{ workout.title }} - {{ workout.location}}
                        <span class="columns dcs">
                            <span class="column has-text-centered dcs">
                                <span class="is-size-2 dcs">{{ distanceFormat(workout.distance) }} </span>
                                <br>
                                <span class="is-size-7 soft-color">Distance</span>
                            </span>
                            <span class="column has-text-centered">
                                <span class="is-size-2 dcs">{{ durationFormat(workout.duration) }} </span>
                                <br>
                                <span class="is-size-7 soft-color">Duration</span>
                            </span>
                            <span v-if="picture" class="column has-text-centered">
                                <img :src="workout.picture" alt="" />
                            </span>
                        </span>
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item" aria-label="reply">
                            <span class="icon is-small">
                              <i class="fas fa-reply" aria-hidden="true"></i>
                            </span>
                        </a>
                        <a class="level-item" aria-label="retweet">
                            <span class="icon is-small">
                              <i class="fas fa-retweet" aria-hidden="true"></i>
                            </span>
                        </a>
                        <a class="level-item" aria-label="like">
                        <span class="icon is-small">
                          <i class="fas fa-heart" aria-hidden="true"></i>
                        </span>
                        </a>
                    </div>
                </nav>
            </div>
            <div class="media-right">
                <button class="delete" @click="isHidden = true" aria-label="close"/>
            </div>
        </article>
    </div>

</template>

<style scoped>
button.delete {
    position: absolute;
    right: 1rem;
    top: 1rem;
}

.columns {
    margin: 0;
}
div.box {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 2px var(--color-border) solid;
    border-radius: .25rem;
}

</style>
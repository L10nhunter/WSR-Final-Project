<script setup lang="ts">
import {ref} from "vue";
import {type Workout} from "@/model/workouts";
import {getUser, type User} from "@/model/users";
import {getSession} from "@/model/session";
import FriendButton from "@/components/FriendButton.vue";

const isHidden = ref(false);
const workout = defineProps<Workout>();
const user: User = await getUser(workout.uid);
const showChangeButtons = getSession().user && getSession().user!._id === workout.uid;


function distanceFormat(distance?: number): string {
    if (!distance) return "0ft";
    if (distance >= 5280) return (distance / 5280).toFixed(2) + "mi";
    return distance + "ft";
}

function durationFormat(duration?: number): string {
    if (!duration) return "0m";
    const hours = Math.floor(duration / 60);
    const hoursString = hours < 10 ? "0" + hours : hours;
    const minutes = duration % 60;
    const minutesString = minutes < 10 ? "0" + minutes : minutes;
    return hoursString + ":" + minutesString;
}

function howLongAgo(time: number): string {
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

const userImage = user.image ?? "/l10nFitnessIcon.png";
</script>

<template>
    <div class="box dcs" :class="isHidden && 'is-hidden'">
        <article class="media dcs">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img :src="userImage" alt="Image">
                </figure>
            </div>
            <div class="media-content dcs">
                <div class="content dcs">
                    <p>
                        <span class="dcs has-text-weight-bold">{{ user.firstName }} {{user.lastName }}</span>
                        &nbsp;
                        <small class="soft-color">@{{ user.username }}</small>
                        &nbsp;
                        <small class="soft-color">{{ howLongAgo(workout.time) }}</small>
                        <br>
                        {{ workout.title }} - {{ workout.type }} - {{ workout.location }}
                        <span class="columns dcs">
                            <span v-if="workout.type !== 'Cardio' && workout.type !== 'Strength'" class="column has-text-centered dcs">
                                <span class="is-size-2 scs has-text-weight-bold">{{ distanceFormat(workout.distance) }} </span>
                                <br>
                                <span class="is-size-7 soft-color">Distance</span>
                            </span>
                            <span class="column has-text-centered">
                                <span class="is-size-2 scs has-text-weight-bold">{{ !workout.calories ? 0 : workout.calories }} </span>
                                <br>
                                <span class="is-size-7 soft-color">Calories</span>
                            </span>
                            <span class="column has-text-centered">
                                <span class="is-size-2 scs has-text-weight-bold">{{ durationFormat(workout.duration) }} </span>
                                <br>
                                <span class="is-size-7 soft-color">Duration</span>
                            </span>
                            <span v-if="picture" class="column has-text-centered">
                                <img :src="workout.picture" alt=""/>
                            </span>
                        </span>
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <!--TODO: Make a text box slide out of the bottom, pushing everything else down to make room, then add the comment to the workout itself-->
                        <a class="level-item" aria-label="reply">
                            <span class="icon is-small">
                                <i class="fa-solid fa-reply" aria-hidden="true"></i>
                            </span>
                        </a>
                        <FriendButton v-bind="user"/>
                        <a class="level-item is-color-primary" aria-label="edit" v-if="showChangeButtons">
                            <span class="icon is-small">
                                <i class="fa-solid fa-pen" aria-hidden="true"></i>
                            </span>
                        </a>
                        <a class="level-item is-color-danger" aria-label="edit" v-if="showChangeButtons">
                            <span class="icon is-small">
                                <i class="fa-solid fa-trash" aria-hidden="true"></i>
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
    position: relative;
    top:-1rem;
    right:-1rem;
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
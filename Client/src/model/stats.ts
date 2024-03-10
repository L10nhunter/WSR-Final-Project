import {getWorkoutsByUser} from "@/model/workouts";
import {LoggedInUser} from "@/model/Globals";
export interface Stats{
    distance: number;
    duration: number;
    pace: number;
    calories: number;
}

export function getAllTimeStats(){
    return getStats(0);
}
export function getWeekStats(){
    const date = new Date();
    return getStats(date.setHours(date.getHours() - 168));
}
export function getTodayStats(){
    const date = new Date();
    return getStats(date.setHours(date.getHours() - 24))
}

function getStats(time: number) : Stats{
    const workouts = getWorkoutsByUser(LoggedInUser.value);
    const stats: Stats = {
        distance: 0,
        duration: 0,
        pace: 0,
        calories: 0
    }
    for(const workout of workouts){
        if(workout.time > time){
            stats.distance += workout.distance ?? 0;
            stats.duration += workout.duration;
            stats.calories += workout.calories ?? 0;
        }
    }
    stats.pace = ((stats.distance/5280) / (stats.duration/60));
    return stats;
}
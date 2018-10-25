"use strict";
import { extendObservable, action, computed } from "mobx";

// 点击次数
class clickTimesStore {
    constructor() {
        extendObservable(this, {
            times: 1,
            get total() {
                return this.times * 10;
            }
        });
    }

    @computed
    get getId() {
        return this.times + "Id";
    }

    @action
    click = Increment => {
        this.times += Increment;
    };
}
const clickTimes = new clickTimesStore();

export default clickTimes;

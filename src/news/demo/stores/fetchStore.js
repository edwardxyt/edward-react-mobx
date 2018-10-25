"use strict";
import { observable, action } from "mobx";
import ajax from "../plugins/axios";
import { map } from "ramda";

// 请求
class fetchDataStore {
    @observable data;
    @observable state;
    @action
    fetchAjax = () => {
        // let params = {
        //     orderId: 2089360
        // };
        let url = `/mpwap/api/v1/prdCurContracts.shtml?orderId=2089360&orderType=01`;
        // let url = `/mpwap/api/v1/prdCurRecordDetail.shtml`;
        // http://10.105.101.48:8080/api/test-c/wap/mpwap/api/v1/prdCurRecordDetail.shtml
        // https://m.9888.cn/mpwap/api/v1/prdCurRecordDetail.shtml
        // let url = `${__API__}/api/123`;

        ajax.post(url).then(
            action("fetch_prdCurContracts_success", response => {
                let {
                    data: { contractMsg }
                } = response.data;

                map(item => {
                    console.log(item);
                }, contractMsg);

                this.state = 2;
                this.data = `加载${contractMsg.length}条数据`;
            })
        );

        // fetch(url, { method: "post" })
        //     // .then(res => res.json())
        //     .then(res => {
        //         console.log(res);
        //     });

        // let xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState === 4) {
        //         if (xhr.status === 200) {
        //             console.log(xhr.responseText);
        //         } else {
        //             console.error(xhr.statusText);
        //         }
        //     }
        // };
        //
        // xhr.onerror = function(e) {
        //     console.error(xhr.statusText);
        // };
        //
        // xhr.open("POST", url, true);
        // xhr.send(null);
    };
    constructor() {
        this.data = null;
        this.state = 0;
    }
}
const fetchData = new fetchDataStore();

export default fetchData;

"use strict";
import React from "react";
import style from "./css.css";
// 公用属性
import commonStyle from "../../common/css/css.css";
import { observer, inject } from "mobx-react";

@inject("clickTimes")
@observer
class Component extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {}
    componentDidMount() {
        var mySwiper = new Swiper(".swiper-container", {
            direction: "vertical",
            loop: true,

            // 如果需要分页器
            pagination: {
                el: ".swiper-pagination"
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
    }
    _addHandle(num) {
        this.props.clickTimes.click(1);
    }
    render() {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className={commonStyle.container}>
                            <div
                                className={commonStyle.index}
                                onClick={() => {
                                    this._addHandle(1);
                                }}
                            >
                                <div className={style.icon} />
                                点击次数：{this.props.clickTimes.times}
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">Slide 2</div>
                    <div className="swiper-slide">Slide 3</div>
                </div>
                {/* <!-- 如果需要分页器 --> */}
                <div className="swiper-pagination" />

                {/* <!-- 如果需要导航按钮 --> */}
                <div className="swiper-button-prev" />
                <div className="swiper-button-next" />
            </div>
        );
    }
}

export default Component;

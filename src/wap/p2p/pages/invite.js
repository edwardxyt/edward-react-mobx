import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/invite.css'
import {NativeBridge} from '../helpers'

@CSSModules(styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Invite extends React.Component {
    componentDidMount() {
        NativeBridge.setTitle('邀请返利')
    }

    render() {
        return <div styleName="connection-box">
            <div styleName="top">
                <img src={require("../images/invite/top.png")}/>
            </div>
            <div styleName="step">
                <div styleName="step-item">
                    <img src={require("../images/invite/step-one.png")}/>
                    <div styleName="step-text">好友填写邀请码<br/><span styleName="colorRed font28">成功注册</span></div>
                </div>
                <div styleName="step-item">
                    <img src={require("../images/invite/step-two.png")}/>
                    <div styleName="step-text">好友30天内出借<br/><span styleName="colorRed font28">满足升级条件</span></div>
                </div>
                <div styleName="step-item">
                    <img src={require("../images/invite/step-three.png")}/>
                    <div styleName="step-text">邀请人立获<br/><span styleName="colorRed font28">相应工豆奖励</span></div>
                </div>
            </div>
            <div styleName="earn-box">
                <img src={require("../images/invite/title-earn.png")}/>
                <img src={require("../images/invite/content-earn.png")}/>
                <div styleName="case-box">
                    <span styleName="case-title">举个例子：</span>工友A在2017年3月12日邀请了工友B，若工友B在注册后第10天
                    (3月21日)等级升为VIP1，则工友A会得到价值50元工豆，若在第15天等级升为VP2，可再获价值150元工豆，共获得
                    累计价值200元工豆；若工友B在注册后1天内等级升为VIP4，则工友A会得到价值2400元工豆（价值50元工豆+价值150
                    元工豆+价值700元工豆+价值1500元工豆）。
                </div>
            </div>
            <div styleName="vip-box">
                <img src={require("../images/invite/title-invite.png")} styleName="title-invite"/>
                <img src={require("../images/invite/title-vip.png")} styleName="vip-pic"/>
                <div styleName="vip-text">
                    <div styleName="text-item">
                        邀请人获<br/>
                        50元工豆
                    </div>
                    <div styleName="text-item">
                        邀请人获<br/>
                        150元工豆
                    </div>
                    <div styleName="text-item">
                        邀请人获<br/>
                        700元工豆
                    </div>
                    <div styleName="text-item">
                        邀请人获<br/>
                        1500元工豆
                    </div>
                </div>
            </div>
            <div styleName="mj-box">
                <div styleName="mj-text">
                    工豆会在好友注册后30天内(含注册当日)，根据<br/>
                    好友当时达到的相应等级实时发放相应的工豆。
                </div>
                <img src={require("../images/invite/xj.png")} styleName="mj-pic"/>
            </div>
            <div styleName="footer">
                <img src={require("../images/invite/footerbg.png")}/>
            </div>
        </div>
    }
}

export default Invite
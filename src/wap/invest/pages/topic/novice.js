import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../../css/topic/novice.css'

@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class Novice extends React.Component {

    state = {
        show_pop: false
    }

    toggleHandler = () => {
        this.setState({ show_pop: !this.state.show_pop })
    }

    render() {

        let pop = <div styleName="popup-window">
            <div styleName="pop-close" onClick={this.toggleHandler}>
            </div>
            <div styleName="pop-text">
                <div styleName="p-text ruler">
                    <div styleName="p-title">活动规则：</div>
                    1：新工友注册送200元返现券和2.6克返金券礼包<br />
                    2：首投满额100元起即获得一张0.6%的返息券
                </div>
                <div styleName="p-text des">
                    <div styleName="p-title">活动说明：</div>
                    <div styleName="des-text">
                        1、每张返现券/返金券都有其对应使用条件，可在“我的工场-优惠券”中查看返现/返金明细；
                        </div>
                    <div styleName="des-text">
                        2、返现券/返金券不可直接抵现金/黄金，不可转让，不可用于投资转让项目；
                    </div>
                    <div styleName="des-text">
                        3、除特殊说明外，每次投标可使用多张返现券/返金券。投资时请务必勾选“使用优惠券”，投资成功即返对应现金/黄金，现金返至对应微金or尊享账户，黄金返至工场黄金账户，返还的现金可用于继续投资或提现，返还的黄金可变现；
                    </div>
                    <div styleName="des-text">
                        4、本活动最终解释权归金融工场所有，详细可致电客服热线咨询：
                        <a href="tel:400-0322-988">400-0322-988</a>。</div>
                </div>
            </div>
        </div>

        return <div styleName="novice-box">
            <div styleName="novice-title"> 新手策略 </div>
            <div styleName="model model-new">
                <div styleName="text new-text">
                    成功注册即获<span styleName="yellow">新手大礼包</span>。分为20元、40元、60元、80元的返现券和0.1克、0.5克、2克的返金券，如何正确的首投赚更多呢？
        </div>
            </div>
            <div styleName="model model-primary">
                <div styleName="text primary-text">
                    新手必学！<span styleName="yellow">首次投资100元起即获得一张0.6%的返息券。</span>
                </div>
            </div>
            <div styleName="model model-middle">
                <div styleName="text middle-text">
                    想赚更多？<span styleName="yellow">首投8000元立获80元</span>。
        </div>
            </div>
            <div styleName="model model-advanced">
                <div styleName="text advanced-text">
                    最高挑战！<span styleName="yellow">首投2万可获200元奖励全到手，满满幸福感！</span>
                </div>
            </div>
            <div styleName="footer">
                <div styleName="clickevent">
                    <a href="https://m.9888.cn/mpwap/orderuser/toRegister.shtml" styleName="link"></a>
                </div>
                <div styleName="activity" onClick={this.toggleHandler}>
                    <img src={require("../../images/topic/novice/hdxj.png")} styleName="activity-pic" />
                </div>
            </div>

            {this.state.show_pop && pop}
        </div>
    }
}

export default Novice
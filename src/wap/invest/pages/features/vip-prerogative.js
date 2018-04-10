import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Utils } from 'fw-javascripts'

import { Header } from '../../components'
import { Get, Browser,NativeBridge } from '../../helpers'
import styles from '../../css/features/vip-prerogative.css'

@inject("features")
@observer
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore'  })
class VipPrerogative extends React.Component {

    componentDidMount() {
        let { features } = this.props;
        features.getDataHandler()
    }
    render() {
        let vip_section1 = () => {
            let { level_list } = this.props.features.data

            let level_list_func = (item, index) => {
                let bgcolor = index % 2 == 0 ? styles['table-gift-even'] : styles['table-gift-odd']
                return <div className={bgcolor} key={index}>
                    <div styleName="titlerow">{item.levelName}</div>
                    <div styleName="titlerow">{item.addInterest ? item.addInterest.describe.slice(0, -4) : '-'}</div>
                    <div styleName="titlerow">{item.birthdayBag ? item.birthdayBag.describe.slice(0, -4) : '-'}</div>
                    <div styleName="titlerow">{item.levelUpBag ? item.levelUpBag.describe.slice(0, -4) : '-'}</div>
                    {index == 2 && <div styleName="titlerow">敬请期待</div>}
                </div>
            }
            return <div styleName="section section-1">
                <img styleName="title-img" src={require("../../images/vip-prerogative/update-title4.png")} />

                <div styleName="level-gift">
                    <img styleName='level-gift-pic' src={require("../../images/vip-prerogative/update-level.png")} />
                    会员投资送加息
                </div>
                <div styleName="level-gift">
                    <img styleName='level-gift-pic' src={require("../../images/vip-prerogative/update-birthday.png")} />
                    生日当天有惊喜
                </div>
                <div styleName="level-gift">
                    <img styleName='level-gift-pic' src={require("../../images/vip-prerogative/update-bag.png")} />
                    等级UP拿好礼
                </div>
                <div styleName="level-gift">
                    <img styleName='level-gift-pic' src={require("../../images/vip-prerogative/update-waiting.png")} />
                    更多特权
                </div>
                <img styleName="gift-title" src={require("../../images/vip-prerogative/gift-title.jpg")} />
                <div styleName="table-gift">
                    <div styleName="table-gift-tr">
                        <div styleName="titlerow">等级</div>
                        <div styleName="titlerow">年化加息</div>
                        <div styleName="titlerow">生日大礼包</div>
                        <div styleName="titlerow">升级大礼包</div>
                        <div styleName="titlerow">更多特权</div>
                    </div>
                    {(level_list.length != 0) && level_list.map(level_list_func)}
                </div>

                <div styleName="comments" style={{ "display": "none" }}> 备注: 因活动而增加的等级福利, 不在上述描述范围内</div>

                <div styleName="comments">
                    温馨提示：奖励工豆起息后发放至您的工豆账户；灵活期限标起息后先发锁定期内的奖励，回款时发放剩余奖励；仅投资按月/季等额还款项目，最终年化加息率为您的等级年化加息率乘以0.56，0.56为借款方占用投资方的资金使用率。
                </div>
            </div>
        }

        let vip_section2 = () => {
            let { firstInvestAmount, limitDays, sendStore } = this.props.features.data
            return <div styleName="section section-2">

                <img styleName="title-img" src={require("../../images/vip-prerogative/update-title1.png")} />

                <div styleName="paragraph">
                贡献值是衡量用户等级的标准，用户可以通过投资获取贡献值。
                </div>

                <div styleName="paragraph value-formula">贡献值越多，相应的会员等级越高，可享的优惠福利也就越大。</div>

                <div styleName="value-describe">
                    <div styleName="oweData">
                        贡献值即用户实时待收年化投资额度；
                    </div>
                    <div styleName="oweData">
                    计算公式：贡献值=投资金额*投资期限/360
                    </div>
                </div>
            </div>
        }

        let vip_section3 = () => {
            return <div styleName="section section-3">
                <img styleName="title-img" src={require("../../images/vip-prerogative/update-title2.png")} />
                <img styleName="example-img" src={require("../../images/vip-prerogative/c.jpg")} />
                <img styleName="example-img" src={require("../../images/vip-prerogative/d.jpg")} />
            </div>
        }
        let vip_section4 = () => {
            let { levelConfig } = this.props.features.data
            return <div styleName="section section-4">
                <img styleName="title-img" src={require("../../images/vip-prerogative/update-title3.png")}/>
                <div styleName="table-level-box">
                    <div styleName="tableLevelTitle">
                        <div styleName="cell-title">等级</div>
                        <div styleName="cell-title">所需贡献值</div>
                    </div>
                    <div styleName="tableLevelCell">
                        <div styleName="cell">普通会员</div>
                        <div styleName="cell" id="vip-0">
                            {`${Utils.format.price(levelConfig.minLv1)}-${Utils.format.price(levelConfig.maxLv1)}`}
                        </div>
                    </div>
                    <div styleName="tableLevelCell">
                        <div styleName="cell cell-even">VIP1</div>
                        <div styleName="cell cell-even">
                            {`${Utils.format.price(levelConfig.minLv2)}-${Utils.format.price(levelConfig.maxLv2)}`}
                        </div>
                    </div>

                    <div styleName="tableLevelCell">
                        <div styleName="cell">VIP2</div>
                        <div styleName="cell">
                            {`${Utils.format.price(levelConfig.minLv3)}-${Utils.format.price(levelConfig.maxLv3)}`}
                        </div>
                    </div>

                    <div styleName="tableLevelCell">
                        <div styleName="cell cell-even">VIP3</div>
                        <div styleName="cell cell-even">
                            {`${Utils.format.price(levelConfig.minLv4)}-${Utils.format.price(levelConfig.maxLv4)}`}
                        </div>
                    </div>
                    <div styleName="tableLevelCell">
                        <div styleName="cell">VIP4</div>
                        <div styleName="cell">{`${Utils.format.price(levelConfig.minLv5)}以上`}</div>
                    </div>

                </div>
            </div>
        }
        let vip_section5 = () => {
            let {firstInvestAmount, limitDays, sendStore} = this.props.features.data
            return <div styleName="section section-5">
                <img styleName="title-img" src={require("../../images/vip-prerogative/update-title5.png")}/>

                <div styleName="text text-1">用户自身投资可获得贡献值，等级实时增长。</div>
                <div styleName="text text-2">贡献值即用户实时待收年化投资额度。
                    <div styleName="formula">计算公式：贡献值=投资金额 &times; 投资期限/360</div>
                </div>
                <div styleName="text text-3">
                    贡献值即用户实时待收年化投资额度；
                </div>
                <div styleName="text text-4">用户回款、流标后，您对应产品的投资贡献值会减少。</div>
                <div styleName="text text-5">若贡献值减少，但距离上次等级变更时间在30天以内，则保持当前等级；若超出30天，则对应实际的等级。</div>
                <div styleName="text text-6">用户贡献值、会员等级相关最终解释权归工场微金所有。</div>
                <div styleName="text text-7"> 购买债权转让不参与等级贡献值的计算。</div>
            </div>
        }
        return <div>
            {/* <Header title='升级攻略' history={this.props.history} />  */}
            <div styleName="vipContent">
                {vip_section1()}
                {vip_section2()}
                {vip_section3()}
                {vip_section4()}
                {vip_section5()}
            </div>
        </div>
    }
}
export default VipPrerogative
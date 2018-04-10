import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import styles from '../../css/fa-xian/coupon.css'
import { NativeBridge } from '../../helpers'
import CouponBags from './components/coupon-bags'
import CouponSingles from './components/coupon-singles'
import CouponEnd from './components/coupon-end'

@inject('faxian')
@observer
@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore'  })
class Coupon extends React.Component {
    state = {
        isShowEmpty: false,
    }

    componentDidMount() {
        NativeBridge.setTitle('领券中心')
        this.props.faxian.requestGiftList().then(data => {
            let { faxian } = this.props
            if (faxian.data.giftList.length == 0 && faxian.data.limitList.length == 0 && faxian.data.endList.length == 0) {
                this.setState({ isShowEmpty: true })
            }
        })
    }

    render() {
        let empty_holder = this.state.isShowEmpty && <div styleName="empty-box">
            <img src={require('../../images/fa-xian/coupon-center/icon-empty.png')} styleName="emptyImg" />
            <div styleName="empty_text">一大波“优惠券”即将来袭</div>
        </div>
        return <div styleName="totalBox">
            {empty_holder}
            <CouponBags />
            <CouponSingles />
            <CouponEnd />
        </div>
    }
}


export default Coupon
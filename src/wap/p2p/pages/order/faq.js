import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/order/faq.css'
import {Components} from 'fw-javascripts'
import {NativeBridge} from '../../helpers/'

const QA = [{
    q: '智存宝是如何计算收益的？',
    a: '智存宝每天的收益都不同，收益计算公式=(余额宝确认金额/10000)X当天公司公布的每万份收益。建议智存宝转入金额为100元以上可以有较高概率看到收益。(若当天收益不到1分钱，系统可能不会分配收益，且也不会累积)。'
}, {
    q: '每次加入零钱的可购买额度是怎么得出的？',
    a: '在首页申请授信，根据节点提示上传相应信息，完成全部节点后，会根据您的资料情况授予相应额度。'
}, {
    q: '加入零钱投入了哪些项目？',
    a: '在本平台保持良好的信用会不定时调整额度'
}, {
    q: '转入后，为什么没有开始计息？',
    a: '系统会根据还款计划，在还款日20：30自动从您绑定的银行卡中划扣应还金额，为了避免逾期，请保证绑定银行卡内余额充足'
}, {
    q: '转出时是否收取手续费？',
    a: '平台会对逾期的账单收取违约金，违约金为本金的1%没日，<br/>例：您借款1000元，逾期将收取10元/天'
}, {
    q: '为什么我的每日收益曲线波动较大？',
    a: '平台会对逾期的账单收取违约金，违约金为本金的1%没日，<br/>例：您借款1000元，逾期将收取10元/天'
}]

@CSSModules(styles, {
    allowMultiple: true,
    handleNotFoundStyleName: 'ignore'
})
class Faq extends React.Component {

    state = {
        opened: ['show']
    }

    componentDidMount() {
        window.scrollTo(0,0)
    }

    toggleHandler = (index) => {
        let opened = this.state.opened.slice();
        opened[index] = opened[index] == 'show' ? 'hide' : 'show';
        this.setState({ opened: opened });
    }

    render() {
        let qa = (i, index) => {
            var cn = this.state.opened[index] == 'show' ? 'qa show' : 'qa';

            return <div styleName={cn} key={index}>
                <div styleName="q" onClick={() => this.toggleHandler(index)}>
                    <div styleName="icon-down-arrow"></div>
                    {i.q}
                </div>
                <div styleName="a" dangerouslySetInnerHTML={{ __html: i.a }}></div>
            </div>
        }

        return <div styleName="bg">
            <Header title="常见问题" history={this.props.history} />
            {QA.map(qa)}
        </div>
    }
}

export default Faq

import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/current/faq.css'


const QUESATION_LIST = [
    {
        q: '智存宝是如何计算收益的？',
        a: '智存宝每天的收益都不同，收益计算公式=(余额宝确认金额/10000)X当天公司公布的每万份收益。建议智存宝转入金额为100元以上可以有较高概率看到收益。(若当天收益不到1分钱，系统可能不会分配收益，且也不会累积)。  '
    },
    {
        q: '每次加入零钱的可购买额度是怎么得出的？',
        a: 'bbbbb'
    },
    {
        q: '加入零钱投入了哪些项目？',
        a: '智存宝每天的收益都不同，收益计算公式=(余额宝确认金额/10000)X当天公司公布的每万份收益。建议智存宝转入金额为100元以上可以有较高概率看到收益。(若当天收益不到1分钱，系统可能不会分配收益，且也不会累积)。  '
    },
    {
        q: '转入后，为什么没有开始计息？',
        a: '智存宝每天的收益都不同，收益计算公式=(余额宝确认金额/10000)X当天公司公布的每万份收益。建议智存宝转入金额为100元以上可以有较高概率看到收益。(若当天收益不到1分钱，系统可能不会分配收益，且也不会累积)。  '
    },
    {
        q: '转出时是否收取手续费？',
        a: '智存宝每天的收益都不同，收益计算公式=(余额宝确认金额/10000)X当天公司公布的每万份收益。建议智存宝转入金额为100元以上可以有较高概率看到收益。(若当天收益不到1分钱，系统可能不会分配收益，且也不会累积)。  '
    },
    {
        q: '为什么我的每日收益曲线波动较大？',
        a: '智存宝每天的收益都不同，收益计算公式=(余额宝确认金额/10000)X当天公司公布的每万份收益。建议智存宝转入金额为100元以上可以有较高概率看到收益。(若当天收益不到1分钱，系统可能不会分配收益，且也不会累积)。  '
    },
]

@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class Faq extends React.Component {
    state = {
        questionList: [true]
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    toggleHandler = (index) => {
        let list = this.state.questionList.slice()
        list[index] = !list[index]
        this.setState({questionList: list})
    }

    render() {
        let history = this.props.history
        let q_fn = (item, index) => {
            let q_style = this.state.questionList[index]
            return <div styleName={q_style ? "qItemShow" : "qItemHide"} key={index}>
                <div styleName="itemQuestion" onClick={() => this.toggleHandler(index)}>
                    <div styleName="questionLeft">{item.q}</div>
                    <div styleName={q_style ? "arrowUp" : "arrowDown"}></div>
                </div>
                <div styleName="itemAnswer">{item.a}</div>
            </div>
        }
        return <div>
            <Header title="常见问题" history={history}/>
            {QUESATION_LIST.map(q_fn)}
        </div>
    }
}

export default Faq
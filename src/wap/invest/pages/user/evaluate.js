import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components, Utils } from 'fw-javascripts'

import { Header } from '../../components'
import { NativeBridge, Browser, Get } from '../../helpers'
import styles from '../../css/user/evaluate.css'

const QUESTIONS = [{
    q: 'Q1：您的年龄是？',
    seq: 0,
    name: "age",
    options: [{
        a: 'A.18-30岁',
        score: 2
    }, {
        a: 'B.31-50岁',
        score: 6
    }, {
        a: 'C.51-65岁',
        score: 4
    }, {
        a: 'D.高于65岁',
        score: 2
    }]
}, {
    q: 'Q2：您的家庭年收入为（折合人民币）？',
    seq: 1,
    name: "income",
    options: [{
        a: 'A.5万元以下',
        score: 2
    }, {
        a: 'B.5-20万元',
        score: 4
    }, {
        a: 'C.20-50万元',
        score: 6
    }, {
        a: 'D.50-100万元',
        score: 8
    }, {
        a: 'E.100万元以上',
        score: 10
    }]
}, {
    q: 'Q3：在您每年的家庭收入中，可用于投资（储蓄存款除外）的比例为？',
    seq: 2,
    name: "can",
    options: [{
        a: 'A.小于10%',
        score: 2
    }, {
        a: 'B.10%至25% ',
        score: 4
    }, {
        a: 'C.25%至50%',
        score: 6
    }, {
        a: 'D.大于50%',
        score: 8
    }]
}, {
    q: 'Q4：您过去一年投资非保本类金融产品的总金额为？',
    seq: 3,
    name: "total",
    options: [{
        a: 'A.1万以下',
        score: 0
    }, {
        a: 'B.1-5万',
        score: 2
    }, {
        a: 'C.5-10万',
        score: 6
    }, {
        a: 'D.10-50万',
        score: 10
    }, {
        a: 'E.50万以上',
        score: 10
    }]
}, {
    q: 'Q5：以下哪项最能说明您的投资经验？ ',
    seq: 4,
    name: "experience",
    options: [{
        a: 'A.除存款、国债等保本类金额产品外，我从不投资其他非保本类金融产品，包括股票、基金、理财产品等',
        score: 2
    }, {
        a: 'B.大部分投资于存款、国债等，少部分投资于股票、基金、理财产品等风险产品',
        score: 4
    }, {
        a: 'C.资产均衡地分布于存款、国债、银行理财产品、信托产品、股票、基金等',
        score: 6
    }, {
        a: 'D.大部分投资于股票、基金、外汇、金融衍生品、海外投资产品等高风险产品，较少投资于存款、国债',
        score: 8
    }]
}, {
    q: 'Q6：您有多少年投资股票、基金、外汇、理财产品、网络投资、金融衍生产品、海外投资产品等风险投资品的经验？',
    seq: 5,
    name: "experiencePeriod",
    options: [{
        a: 'A.少于1年',
        score: 1
    }, {
        a: 'B.1至3年',
        score: 4
    }, {
        a: 'C.3至5年',
        score: 6
    }, {
        a: 'D.5年以上',
        score: 8
    }]
}, {
    q: 'Q7：您的互联网操作熟练程度是怎样的？',
    seq: 6,
    name: "practised",
    options: [{
        a: 'A.1年以内互联网使用经验',
        score: 1
    }, {
        a: 'B.1至5年互联网使用经验',
        score: 4
    }, {
        a: 'C.5至10年互联网使用经验',
        score: 6
    }, {
        a: 'D.10年以上互联网使用经验',
        score: 8
    }]
}, {
    q: 'Q8：您计划的投资期限是多久？',
    seq: 7,
    name: "period",
    options: [{
        a: 'A.3个月以内',
        score: 1
    }, {
        a: 'B.3至6个月',
        score: 2
    }, {
        a: 'C.6个月至1年',
        score: 4
    }, {
        a: 'D.1年以上',
        score: 7
    }]
}, {
    q: 'Q9：以下哪项描述最符合您的投资态度？',
    seq: 8,
    name: "attitude",
    options: [{
        a: 'A.厌恶风险，不希望本金损失',
        score: 1
    }, {
        a: 'B.保守投资，不希望本金损失，愿意承担一定幅度的收益波动',
        score: 3
    }, {
        a: 'C.寻求资金的较高收益和成长性，愿意为此承担有限本金损失',
        score: 6
    }, {
        a: 'D.希望赚取高回报，愿意为此承担较大本金损失',
        score: 8
    }]
}, {
    q: 'Q10：您的投资出现何种程度的波动时，您会呈现明显的焦虑？ ',
    seq: 9,
    name: "anxious",
    options: [{
        a: 'A.本金无损失，但收益未达预期',
        score: 1
    }, {
        a: 'B.出现轻微本金损失',
        score: 3
    }, {
        a: 'C.本金10%以内的损失',
        score: 5
    }, {
        a: 'D.本金20%-50%的损失',
        score: 7
    }, {
        a: 'E.本金50%以上的损失',
        score: 9
    }]
}]


@CSSModules(styles, { "allowMultiple": true, handleNotFoundStyleName: 'ignore' })
class Evaluate extends React.Component {
    state = {
        finished: false,
        score: 0,
        evaluateType: "风险类型",
        selected: []
    }

    componentDidMount() {
        // NativeBridge.trigger('hide_header')
    }

    back_handler = () => {
        Browser.inApp ?
            NativeBridge.close() :
            this.props.history.goBack()
    }

    selectHandler = (questionIndex, answerIndex) => {
        let { selected } = this.state
        selected[questionIndex] = answerIndex
        this.setState({ selected: selected });
    }

    submitHandler = () => {
        let form_data = { examType: 2 }, { selected } = this.state, err;
        for (let i = 0; i < QUESTIONS.length; i++) {
            let v = ['A', 'B', 'C', 'D', 'E'][selected[i]]
            if (!v) {
                err = true
                break
            }
            form_data[QUESTIONS[i].name] = v
        }
        err ?
            Components.showToast("您还有未填写试题") :
            Get('/orderuser/riskGradeP2P.shtml', form_data)
                .then(data => this.setState({
                    finished: true,
                    score: data.score,
                    evaluateType: data.gradeLevel
                }))
    }

    render() {
        let { finished, score, evaluateType, selected } = this.state
        let { history } = this.props
        let result = () => {
            return <div>
                <div styleName="result-top">
                    <img styleName="result-img" src={require("../../images/user/evaluate/result.png")} />
                    <div styleName="result-score">{score}分</div>
                    <div styleName="result-text1">评估完成，您的风险承受能力为：</div>
                    <div styleName="result-text2">{evaluateType}</div>
                </div>
                <div styleName="result-cnt">
                    <div styleName="result-text-1">郑重提醒：</div>
                    <div styleName="result-text-2">
                        投资人需具备相应的风险承受能力，审慎参与市场投资，合理配置金融资产。本风险承受能力评估并不构成对投资人未来所承担投资风险程度的保证，仅作为本平台客户适当性服务的依据。实际投资时请慎重选择，本平台不对投资人据此投资资金所产生的风险承担责任。
                    </div>
                    <div styleName="result-text-1"> 本人声明：</div>
                    <div styleName="result-text-2">在投资人风险承受能力测试过程中，本人提供的全部信息、资料是真实、准确和完整的，测试结果真实、准确地反映了本人的投资风险承受程度。
                    </div>
                    <div styleName="result-text-2">本人保证上述所填信息为本人真实的意思表示，完全独立依据自身情况和判断做出上述答案，并接受评估意见。否则由此导致的一切后果由本人承担。
                    </div>
                    <div styleName="result-list-box">
                        <div styleName="li-head">
                            <div styleName="li-l">分数</div>
                            <div styleName="li-r">风险承受能力类型</div>
                        </div>
                        <div styleName="li">
                            <div styleName="li-l">61分或以上</div>
                            <div styleName="li-r">进取型</div>
                        </div>
                        <div styleName="li">
                            <div styleName="li-l">41-60分</div>
                            <div styleName="li-r">平衡型</div>
                        </div>
                        <div styleName="li">
                            <div styleName="li-l">21-40分</div>
                            <div styleName="li-r">稳健型</div>
                        </div>
                        <div styleName="li">
                            <div styleName="li-l">20分以下</div>
                            <div styleName="li-r">谨慎型</div>
                        </div>
                    </div>
                </div>
                <div styleName="submit-panel">
                    <a styleName="btn-submit" onClick={this.back_handler}>退出</a>
                </div>
            </div>
        }

        let questions = () => {
            let question = (q, index) => {
                let myName = q.name;
                let myNum = index;
                let option = (o, oIndex) => {
                    let cn = "select";
                    (selected && selected[myNum] == oIndex) ? cn = styles['checked'] : cn = styles['select']
                    return <div styleName="question-select" key={oIndex}
                        onClick={() => this.selectHandler(myNum, oIndex)}
                    >
                        <div className={cn}></div>{o.a}
                    </div>
                }

                return <div key={index} styleName="question-item">
                    <div styleName="question-title">{q.q}</div>
                    {q.options.map(option)}
                </div>
            }
            return <div>
                <div styleName="question-img">
                    <div styleName="question-tips">
                        重要提示：请先仔细阅读然后填写《个人投资风险能力评估表》
                    </div>
                    <div styleName="question-content">
                        <div styleName="qc-title">尊敬的客户：</div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        为了便于您了解自身的风险承受能力，选择合适的投资产品，请您填写以下评估问卷，本平台承诺对您的所有个人资料保密。下列问题可协助评估您对金融工具及投资目标相关风险的态度。请您回答所有的问题，并在各题最合适的答案选项上打“√”。我们将根据您的加总分评估您的投资风险承受能力，建议您投资与自己的风险承受能力相匹配的投资产品。为了及时了解您的投资风险承受能力，我们建议您定期评估。
                    </div>
                    <div styleName="risk-tips">
                        风险提示：投资需承担各类风险，可能遭受资金损失。市场有风险，投资需谨慎。
                    </div>
                </div>
                <div styleName="question-list">{QUESTIONS.map(question)}</div>
                <div styleName="submit-panel">
                    <div styleName="btn-submit" onClick={this.submitHandler}>提交</div>
                </div>
            </div>
        }

        return <div styleName="bg">
            {/* <Header title="风险承受能力评估" history={history} /> */}
            {!finished && questions()}
            {finished && result()}
        </div>
    }
}

export default Evaluate
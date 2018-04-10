import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/current/outflow.css'

@inject('current')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class Outflow extends React.Component {
    state = {
        pop_interest: false
    }

    componentDidMount() {
        this.props.current.fetchOutflowInfo()
    }

    inputChangeHandler = name => e => {
        let v = e.target.value.toString().split(".")
        if (v[1] && v[1].length > 2) {
            v[1] = v[1].substr(0, 2)
            this.props.current.setFormData(name, `${v[0]}.${v[1]}`, 'data')
        } else {
            this.props.current.setFormData(name, e.target.value, 'data')
        }

    }

    allMadeHandler = () => {
        this.props.current.setFormData('outflowAmount', this.props.current.data.outflowInfo.allAmount, 'data')
    }

    closePopInterest = () => {
        this.setState({pop_interest: false})
    }

    outFlowHandler = () => {
        this.setState({pop_interest: true})
    }

    render() {
        let {outflowAmount, outflowInfo} = this.props.current.data
        let {pop_interest} = this.state
        let info_section = () => {
            return <div styleName="info">
                <div styleName="name">总资产(元)</div>
                <div styleName="number">{outflowInfo.allAmount}</div>
                <div styleName="condition">个人单日转出上限{outflowInfo.dayRedeemMaxAmount}万元</div>
            </div>
        }
        let content_section = () => {
            return <div styleName="content">
                <div styleName="title">投资金额</div>
                <div styleName="entrance">
                    <div styleName="enLeft">
                        <span styleName="rmb">&yen;</span>
                        <input type="number" placeholder="可转出4,500.00元至余额" styleName="input"
                               onChange={this.inputChangeHandler('outflowAmount')}
                               value={outflowAmount}
                        />
                    </div>
                    <div styleName="enRight" onClick={this.allMadeHandler}>全部转出</div>
                </div>
            </div>
        }
        let submit_section = () => {
            return <div styleName="submit" onClick={this.outFlowHandler}>
                确认转出
            </div>
        }
        let des_section = () => {
            return <div styleName="rulerDes">
                <span styleName="icon"></span>
                <span styleName="text">智存宝规则说明</span>
            </div>
        }
        return <div styleName="outflowBg">
            <Header title="债权转出"/>
            {info_section()}
            {content_section()}
            {submit_section()}
            {des_section()}
            {pop_interest && <PopInterest closePopInterest={this.closePopInterest}/>}
        </div>
    }
}

@inject('current')
@observer
@CSSModules(styles, {"allowMultiple": true, handleNotFoundStyleName: 'ignore'})
class PopInterest extends React.Component {
    state = {
        select_num: '0',
        interestList: ['26000.00', '27, 000.00', '28, 000.00']
    }

    toggleHandler = (index) => {
        this.setState({select_num: index})
    }

    reWriteHandler = () => {
        this.props.current.data.outflowAmount = ''
        this.props.closePopInterest()
    }

    outFlowHandler = () => {
        //转出操作
        this.props.current.data.outflowAmount = this.state.interestList[this.state.select_num]
    }

    render() {
        let {select_num} = this.state
        let options_func = (item, index) => {
            return <div styleName={select_num == index ? "optionsItemOn" : "optionsItem"} key={index}
                        onClick={() => this.toggleHandler(index)}>
                {`${item}元`}
            </div>
        }
        return <div styleName="popWrapper">
            <div styleName="popContent">
                <div>
                    转出 29,000.00元 后，有部分资金利息无法达到0.01元，建议您选择以下额度转出：
                </div>
                {this.state.interestList.map(options_func)}
                <div styleName="btn">
                    <div styleName="btnItem" onClick={this.reWriteHandler}>重新输入</div>
                    <div styleName="btnItem" onClick={this.outFlowHandler}>确认转出</div>
                </div>
            </div>
        </div>
    }
}


export default Outflow
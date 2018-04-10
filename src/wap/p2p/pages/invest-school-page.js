import React from 'react'
import CSSModules from 'react-css-modules'
import {Header} from '../components'
import styles from '../css/invest-school.css'
import {Utils} from 'fw-javascripts'

@CSSModules(styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore'})
class InvestSchoolFile extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        let id = Utils.hashQuery.id, type = Utils.hashQuery.type;
        let ctx = '';

        if (type == '0') ctx = window.WDXT_FA_LV_FA_GUI[id];
        if (type == '1') ctx = window.WDXT_WANG_DAI_BAI_KE[id];
        if (type == '2') ctx = window.WDXT_CHU_JIE_REN_JIAO_YU[id];

        return <div styleName="filesBg" dangerouslySetInnerHTML={{__html: ctx}}></div>
    }
}

export default InvestSchoolFile
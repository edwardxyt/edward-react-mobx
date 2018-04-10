import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import NotFound from './pages/not-found.js'
import AppDownload from './pages/app-download.js'
import InterestRewords from './pages/interest-reward.js'
// import Invite from './pages/invite'
import InvestSchool from './pages/invest-school'
import InvestSchoolPage from './pages/invest-school-page.js'
import PolicyBox from './pages/policy'
import PDF from './pages/pdf.js'
import Evaluate from './pages/evaluate.js'
import * as FAQ from './pages/faq.js'
import * as Protocol from './pages/protocol'
import * as Notice from './pages/notice'
import * as ReserveBid from './pages/reserve-bid'
import * as NoviceBid from './pages/novice-bid'
import * as Current from './pages/current'
import * as User from './pages/user'
import * as Order from './pages/order'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/faq' component={FAQ.List}/>
                <Route exact path='/faq/:kind' component={FAQ.Page}/>
                <Route exact path='/app-download' component={AppDownload}/>
                <Route exact path='/interest-reward' component={InterestRewords}/>
                {/* <Route exact path='/invite' component={Invite} /> */}
                <Route exact path='/invest-school' component={InvestSchool}/>
                <Route exact path='/invest-school/page' component={InvestSchoolPage}/>
                <Route exact path='/policy' component={PolicyBox}/>
                <Route exact path='/pdf' component={PDF}/>
                <Route exact path='/evaluate' component={Evaluate}/>

                {/*智存宝*/}
                <Route exact path='/current/assets' component={Current.Assets}/>
                <Route exact path='/current/inflow' component={Current.Inflow}/>
                <Route exact path='/current/outflow' component={Current.Outflow}/>
                <Route exact path='/current/product' component={Current.Product}/>
                <Route exact path='/current/records' component={Current.Records}/>
                <Route exact path='/current/protocol' component={Current.Protocol}/>
                <Route exact path='/current/records/item' component={Current.RecordsItem}/>
                <Route exact path='/current/faq' component={Current.Faq}/>

                {/*预约标二期*/}
                <Route exact path="/order/apply" component={Order.Apply}/>
                <Route exact path="/order/records" component={Order.Records}/>
                <Route exact path="/order/records-detail" component={Order.RecordsDetail}/>
                <Route exact path="/order/info" component={Order.Info}/>
                <Route exact path="/order/faq" component={Order.Faq}/>
                <Route exact path="/order/protocol" component={Order.Protocol}/>
                <Route exact path="/order/success" component={Order.Success}/>
                <Route exact path="/order/products" component={Order.Products}/>

                {/*预约标*/}
                <Route exact path="/reserve-bid/info" component={ReserveBid.Info}/>
                <Route exact path="/reserve-bid/apply" component={ReserveBid.Apply}/>
                {/*<Route exact path="/reserve-bid/records" component={ReserveBid.Records}/>*/}
                <Route exact path="/reserve-bid/records" component={Order.Records}/>{/*app不能发版，只能更改component的指向地址*/}
                <Route exact path="/reserve-bid/protocol" component={ReserveBid.Protocol}/>
                {/*<Route exact path="/reserve-bid/products" component={Order.Products}/>*/}
                <Route exact path="/reserve-bid/products" component={ReserveBid.Products}/>
                <Route exact path="/reserve-bid/faq" component={ReserveBid.Faq}/>

                {/*新手标*/}
                <Route exact path="/novice-bid/info" component={NoviceBid.Info}/>
                <Route exact path="/novice-bid/apply" component={NoviceBid.Apply}/>
                <Route exact path="/novice-bid/protocol" component={NoviceBid.Protocol}/>
                <Route exact path="/novice-bid/success" component={NoviceBid.Success}/>

                {/* 公告 */}
                <Route exact path='/notice/risk-prompt' component={Notice.RiskPrompt}/>
                <Route exact path='/notice/safeguard' component={Notice.Safeguard}/>
                <Route exact path='/notice/disclosure' component={Notice.Disclosure}/>
                {/* 公告 兼容 老连接 */}
                <Route exact path='/notice-safeguard' component={Notice.Safeguard}/>
                <Route exact path='/notice-disclosure' component={Notice.Disclosure}/>

                <Route exact path='/user/register-success-p2p' component={User.RegisterSuccess}/>

                {/* 微金协议 */}
                <Route exact path='/protocol/batch-invest' component={Protocol.BatchInvest}/>
                <Route exact path='/protocol/counseling' component={Protocol.Counseling}/>
                <Route exact path='/protocol/entrust-transfer' component={Protocol.EntrustTransfer}/>
                <Route exact path='/protocol/leader-promise' component={Protocol.LeaderPromise}/>
                <Route exact path='/protocol/perform-duty' component={Protocol.PerformDuty}/>
                <Route exact path='/protocol/special-bind' component={Protocol.SpecialBind}/>
                <Route exact path='/protocol/special-cash' component={Protocol.SpecialCash}/>
                <Route exact path='/protocol/special-recharge' component={Protocol.SpecialRecharge}/>
                <Route exact path='/protocol/trusteeship' component={Protocol.TrusteeShip}/>
                <Route exact path='/protocol/service' component={Protocol.Service}/>
                <Route exact path='/protocol/risk-prompt' component={Protocol.RiskPrompt}/>

                <Route exact expiredAt="2017-11-30" path='/vip-prerogative' render={
                    () => location.href = '/static/wap/invest/index.html#/features/vip-prerogative'
                }/>

                <Route component={NotFound}/>
            </Switch>
        </Provider>
    </Router>

}
import {NativeBridgeFactory} from 'fw-javascripts'

let nb = new NativeBridgeFactory('FinancialWorkshop')

nb.close = () => nb.trigger('close')

nb.setTitle = title => nb.trigger('set_title', title)

nb.login = () => nb.trigger('login')

nb.goto = (link, need_login) => nb.trigger('goto', link, need_login)

nb.toNative = (title) => nb.trigger('toNative', title);

export default nb


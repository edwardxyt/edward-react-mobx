module.exports = {
	news: {
		git: {
			library: [],
			console: true,
			mobile: true,
			api_path: "https://cnodejs.org",
			y_api_path: "https://cnodejs.org",
			cdn_path: "/"
			// cdn_path: "/static/news/git/"
			// cdn_path: "//static.xiayuting.cc/news/git/"
		},
		demo: {
			library: [],
			console: false,
			mobile: false,
			api_path: "//m.9888.cn",
			y_api_path: "//m.9888.cn",
			// cdn_path: "/static/news/git/"
			cdn_path: "/"
		},
		swiper: {
			library: [],
			console: true,
			mobile: true,
			api_path: "//m.9888.cn",
			y_api_path: "//m.9888.cn",
			cdn_path: "/static/news/git/"
		},
		prize: {
			library: [],
			console: false,
			mobile: false,
			api_path: "//m.9888.cn",
			y_api_path: "//m.9888.cn",
			cdn_path: "/"
		},
		hook: {
			library: [],
			console: false,
			mobile: false,
			api_path: "//m.9888.cn",
			y_api_path: "//m.9888.cn",
			cdn_path: "/"
		}
	},
	activity: {
		safe: {
			library: [],
			console: true,
			mobile: true,
			api_path: "//m.9888.cn",
			y_api_path: "//m.9888.cn",
			// cdn_path: "/"
			cdn_path: "/pages/safeTrip/"
			// cdn_path: "/website2018/activity/safe/"
			// cdn_path: "/pages/safeTrip/"
			// cdn_path: "/pages/manual/"
		},
		mysafe: {
			library: [],
			console: true,
			mobile: true,
			api_path: "//m.9888.cn",
			y_api_path: "//m.9888.cn",
			// cdn_path: "/"
			cdn_path: "/static/website2018/activity/mysafe/"
		},
		sixActivity: {
			// library: ["moment", "moment-timezone"],
			library: [],
			console: true,
			mobile: true,
			api_path: "https://www.9888keji.com/",
			y_api_path: "//m.9888.cn",
			// cdn_path: "/"
			cdn_path: "/static/website2018/activity/sixActivity/"
		}
	},
	demo: {
		dlPulltorefresh: {
			library: [],
			console: true,
			mobile: false,
			api_path: "//m.9888.cn",
			y_api_path: "//m.9888.cn",
			cdn_path: "/static/news/git/"
		}
	},
	pc: {
		accountOpenManagement: {
			library: ["moment"],
			console: false,
			mobile: false,
			api_path: "//apitest.9888.cn/api/test-c/pc",
			y_api_path: "http://apitest.9888.cn/assertC",
			// cdn_path: "/static/website2018/pc/accountOpenManagement/"
			cdn_path: "/"
		}
	}
};
// @ts-check
const { getPosts, getGists } = require('./getBlog')
const { execSync } = require('child_process')
const getLatestCommit = () => execSync('git rev-parse HEAD').toString().trim().substring(0, 12);

module.exports = {
    title: "harold.kim",
	description: "Yet another security enthusiast.",
    head: [
        ['meta', { name: 'viewport', content: 'initial-scale=1, user-scalable=0' }],
        ['meta', { name: 'keywords', content: 'stypr, Harold Kim, harold.kim' }],
        ['meta', { name: 'google', content: 'notranslate' }],
        ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }],
        ['link', { rel: 'apple-touch-icon-precomposed', href: '/favicon.ico' }],
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:300' }],
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+KR:300' }],
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu+Mono:400' }],
    ],
	markdown: {
		anchor: {
			permalink: false,
			permalinkBefore: false,
		}
	},
	themeConfig: {
		repo: 'stypr/harold.kim',
		editLinks: false,
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'About', link: '/about/' },
			{ text: 'Blog', link: '/blog/' },
			{ text: 'Donate', link: '/donate/' },
			{ text: 'Project', link: '/project/' },
			{ text: 'Contact', link: '/contact/' }
		],
	},
	customData: {
		commit: getLatestCommit(),
		posts: getPosts(),
		gists: getGists(),
	}
};

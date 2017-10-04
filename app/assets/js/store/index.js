import Vue from 'vue';
import Vuex from 'vuex';

import jobs from '@/database/jobs.json';
import education from '@/database/education.json';
import tech from '@/database/skills.tech.json';
import team from '@/database/skills.team.json';
import works from '@/database/portfolio.works.json';
import talks from '@/database/portfolio.talks.json';
import socials from '@/database/social.json';

import {
    GROUP_COVER,
    NAV_PATH_JOBS
} from '@/shared/constants';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({

    strict: process.env.NODE_ENV !== 'production',

    mutations,
    actions,
    getters,

    state: {
        jobs,
        education,
        works,
        talks,
        socials,
        skills: {
            _byId: ['tech', 'team'],
            tech: { label: 'Technological stack', list: tech },
            team: { label: 'Teamwork skills and tools', list: team }
        },

        isLoaded: false,
        activeNav: false,
        activeGroup: GROUP_COVER,
        route: NAV_PATH_JOBS,
        pagelistScroll: 0
    }
});

export default store;
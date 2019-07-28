import { subjectsApi, subjectApi } from '@/api/api'
import service from '@/utils/request'

const state = {

}

const mutations = {

}

const actions = {

  getSubjects({ commit }, options) {
    return new Promise((resolve, reject) => {
      service.get(subjectsApi, {
        params: options
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addSubject({ commit }, user) {
    return new Promise((resolve, reject) => {
      service.post(subjectsApi, user).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteSubject({ commit }, subject) {
    const deleteSubjectApi = subjectApi.replace(':subjectId', subject._id)
    return new Promise((resolve, reject) => {
      service.delete(deleteSubjectApi).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


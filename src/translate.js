const rp = require("request-promise")
const userAgents = require("user-agents")
const token1 = require("./token")
const language = require("./language")
const { FANYI_BAIDU_URL, transapi } = require("./config")
const { Auto, English } = language

const translate = {
  v2: async (query, from, to, full = false) => {
    const { sign, token, cookie } = await token1.get(query)
    const qs = {
      transtype: "realtime",
      simple_means_flag: 3,
      from, to, query, sign, token
    }
    try {
      const opts = {
        uri: transapi.v2,
        headers: {
          'User-Agent': new userAgents({ deviceCategory: 'desktop' }).toString(),
          Referer: FANYI_BAIDU_URL,
          Cookie: cookie
        },
        qs,
        json: true
      }
      const result = await rp(opts)

      if (result.error) {
        const error = new Error(result.error)
        error.code = result.error
        throw error
      }

      if (full === true) {
        return result
      }

      const { trans_result } = result
      const { from, to } = trans_result
      const { dst, src } = trans_result.data[0]

      return {
        from,
        to,
        dst,
        src
      }
    } catch (error) {
      error.code = 'BAD_NETWORK'
      throw error
    }
  },
  langdetect: async query => {
    try {
      const result = await rp({
        uri: transapi.langdetect,
        headers: { 'User-Agent': new userAgents({ deviceCategory: 'desktop' }).toString() },
        qs: { query },
        json: true
      })
      if (result.error) {
        const error = new Error(result.error)
        error.code = result.error
        throw error
      }

      return result.lan
    } catch (error) {
      error.code = 'BAD_NETWORK'
      throw error
    }
  }
}

module.exports = async (query, opts = {}) => {
  let { from = Auto, to = English, full = false } = opts

  if (from !== Auto) {
    from = await translate.langdetect(query)
  }
  return await translate.v2(query, from, to, full)
};


module.exports.language = language;
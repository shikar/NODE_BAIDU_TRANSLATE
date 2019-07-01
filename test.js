import test from 'ava'

import translate from './index'

test('translate with string', async t => {
  try {
    const result = await translate('hello')
    t.is(result.from , 'en')
    t.is(result.to , 'zh')
    t.is(result.src , 'hello')
    t.is(result.dst , '你好')
  } catch (err) {
    t.log(err)
    t.fail()
  }
})

test('translate with string return full result', async t => {
  try {
    const result = await translate('hello', {full: true})
    t.true(result.hasOwnProperty('trans_result'))
    t.is(result.trans_result.from , 'en')
    t.is(result.trans_result.to , 'zh')
    t.is(result.trans_result.data[0].src , 'hello')
    t.is(result.trans_result.data[0].dst , '你好')
    t.true(result.hasOwnProperty('dict_result'))
    t.true(result.hasOwnProperty('liju_result'))
    t.true(result.hasOwnProperty('logid'))
  } catch (err) {
    t.log(err)
    t.fail()
  }
})
!(function douyinAutowelcomeAndthanksTool() {
    const config = {
        fanLampName: '问天', //配置粉丝牌子名称，不同主播的灯牌昵称不同
        userLevel: 20, //配置被欢迎用户等级
        lampLevel: 7, //配置被欢迎粉丝牌子等级
        thanksMusic: 'https://s1.aigei.com/pvaud/aud/mp3/a9/a9ede4bb902045d5814b7d754e39b893.mp3?e=1673565360&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:DPTKgB_4OBGGapzwxXmT1zk0j3U=' //配置特效礼物感谢BGM
    }
    let startTime = Date.now()

    var interval = 3000;
    let blessings =
        `心想事成美梦成真万事如意锦绣前程鹏程万里事事顺利合家欢乐春风得意前程似锦大展鹏图马到功成万事如意福如东海寿比南山心想事成工作顺利事业有成天天开心欢乐永远身体健康大吉大利福寿双全一帆风顺二龙腾飞三羊开泰四季平安五福临门六六大顺七星高照八面来财九九同心十全十美千事吉祥万事如意财源广进恭喜发财财源滚滚生意兴隆日夜红火日进斗金和气生财`
    blessings = blessings.replace(/(.{4})/g, "$1,"); //逗号分组，
    blessings = blessings.split(',') //拆分成数组
    blessings.splice(blessings.length - 1, 1) //去除最后一个空
    const myaudio = new Audio()
    const giftAudio1 = new Audio()
    const giftAudio2 = new Audio()
    const bulletaudio = new Audio()
    const musicAudio = new Audio()
    const pepoleCountAudio = new Audio()
    // 设置musicAudio默认音量
    musicAudio.volume = .3
    // 该链接容易挂掉,如果有稳定的请用稳定的
    let musicAudioSrcObj = {
        "victory": 'https://s1.aigei.com/src/aud/mp3/0c/0cae3d6830a345c8b726a1d3d1dbc619.mp3?e=1673537220&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:KVdSjY1oCMVFDKA7GmieOroaZkE=',
        '正能量': 'https://s1.aigei.com/src/aud/mp3/17/174bebc7d28f4f5fae92214a53f04720.mp3?e=1673538360&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:WJzj2dfbiT-2aARllEezIP_0ZFE=',
        '冲锋': 'https://s1.aigei.com/src/aud/mp3/6f/6f84306b116b4df8be84c4875d6e86ab.mp3?e=1673572260&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:uZwz_LsYqD-D6dsjIAIoc4uMfWk='

    }
    // 追加匹配关键词
    let keyword_preset = [new RegExp(/怎么下载|在哪下载|如何下载|怎么玩|在哪玩|下载/), new RegExp(/版本/), new RegExp(
            /怎么作图|做图/), new RegExp(/我来了/), new RegExp(/victory|胜利/, 'i'), new RegExp(/正能量/, 'i'),
        new RegExp(/菜鸡|太菜了|真菜|菜鸟/, 'i'), new RegExp(/冲锋/, 'i'), new RegExp(/抬走/, 'i')
    ]
    let people = []

    function getRandomNum(n, m) {
        return Math.round(Math.random() * (m - n) + n)
    }


    // 正则屏蔽危险评论、昵称 ....
    function shield_dangerous_comment(str) {
        let reg = new RegExp(unescape(
            '%u4E60%u8FD1%u5E73%7C%u8B66%u5BDF%7C%u767D%u7EB8%u8FD0%u52A8%7C%u50BB%u903C%7C%u6742%u79CD%7C%u903C%7C%u75AB%u82D7%7C%u65B0%u51A0%7C%u75AB%u60C5%7C%u5171%u4EA7%u515A%7C%u5F20%u73CA%u73CA%7C%u5218%u946B%u5B87%7C%u5668%u5B98%u79FB%u690D'
        ), 'gi')
        if (str) {
            let res = str.replace(reg, '主播我爱你，你太牛了')
            return res
        }

    }

    let bullet_chat = []
    let bullet_record = [] //弹幕记录

    function youdaospeaker_src(content) {
        return youdao_speaker =
            `https://tts.youdao.com/fanyivoice?word=${content}&le=zh&keyfrom=speaker-target`
    }



    // 直播间前榜三关注 排名
    const billboardAudio = new Audio()
    let broadcastRankingInterval = setInterval(() => {
        let wrapper = document.querySelectorAll('#audiencePanelScrollId .lazyload-wrapper ')
        let billboard_1 = wrapper[0].querySelector('.IgN8mayw').innerHTML
        let billboard_2 = wrapper[1].querySelector('.IgN8mayw').innerHTML
        let billboard_3 = wrapper[2].querySelector('.IgN8mayw').innerHTML
        billboardAudio.src = youdaospeaker_src(
            `大家给榜一${billboard_1}，榜二${billboard_2}，榜三${billboard_3}点点关注，感谢他们的支持，主播才更有动力。祝老板们${blessings[getRandomNum(0,blessings.length-1)]}${blessings[getRandomNum(0,blessings.length-1)]}${blessings[getRandomNum(0,blessings.length-1)]}${blessings[getRandomNum(0,blessings.length-1)]}`
        )
        billboardAudio.play()
    }, 60000 * 30)

    // 直播间在线人数播报提示
    let onlineNum = [0]
    let onlinePeopleInterval = setInterval(() => {
        let peoplenNum = document.querySelector('.sz0V8anf')
        if (peoplenNum) {
            peoplenNum = Number(peoplenNum.innerHTML) //转成number类型
            onlineNum.push(peoplenNum)
            let difference = onlineNum[onlineNum.length - 1] - onlineNum[onlineNum.length - 2]
            if (difference > 0) {
                pepoleCountAudio.src = youdaospeaker_src(
                    `当前直播间在线人数为：${peoplenNum}，比之前增长了${difference}人，再接再厉啊主播`)
            } else {
                pepoleCountAudio.src = youdaospeaker_src(
                    `当前直播间在线人数为：${peoplenNum}，比之前减少了${-difference}人  ，兄弟们帮主播把赞点一点涨涨人气哦，感谢你们么么哒`)
            }
            pepoleCountAudio.play()
        }
    }, 60000 * 11)

    // 直播间在线人数精确统计 1分钟统计一次
    let onlineNum2 = [0]
    let onlinePeopleInterval2 = setInterval(() => {
        let peoplenNum = document.querySelector('.sz0V8anf')
        if (peoplenNum) {
            peoplenNum = Number(peoplenNum.innerHTML) //转成number类型
            onlineNum2.push(peoplenNum)
        }
    }, 60000)
    // 场观
    let peopleArr = []
    let nicknameOfAudience = []
    let fieldViewInterval = setInterval(() => {
        let comingBox = document.querySelector('.webcast-chatroom___bottom-message');
        let isExsistBox = comingBox.querySelector('.LU6dHmmD');
        if (isExsistBox) {

            // 可以获取进来的人数
            peopleArr.push(isExsistBox.innerHTML)
            // 防止人数进来多重复读取
            if (peopleArr[peopleArr.length - 1] !== peopleArr[peopleArr.length - 2] && peopleArr
                .length != 0) {
                // 最后一个防止溢出一般不会 截取最后一次
                peopleArr = peopleArr.slice(-1)
                let date = new Date().toLocaleString('zh-cn'); // zh-cn代表中国
                nicknameOfAudience.push({
                    nickname: peopleArr[0],
                    time: date
                })
            }
        }
    }, 300)


    // 保存所有有效弹幕到数组
    let bullet_record_Interval = setInterval(() => {
        // 直播结束推送弹幕数组 k5cuEeRD
        let liveFlag = document.querySelector('.k5cuEeRD');
        // 只获取最后一个盒子里的弹幕
        let bullet_chat_box = document.querySelector(
            '.webcast-chatroom___items>div:nth-child(1)>div:last-child')
        if (bullet_chat_box) {
            let speakername = bullet_chat_box.querySelector('.LU6dHmmD')
            speakername = speakername ? speakername.innerHTML.split('：')[0] : null
            let speaker_bullet_chat = bullet_chat_box.querySelector(
                '.webcast-chatroom___content-with-emoji-text')
            speaker_bullet_chat = speaker_bullet_chat ? speaker_bullet_chat.innerHTML : null;
            if (speaker_bullet_chat != null) {
                let str = `${speakername}说：${speaker_bullet_chat}`
                bullet_record.push(str)
                if (bullet_record[bullet_record.length - 1] == bullet_record[bullet_record.length -
                        2]) { //删除最后一个重复项
                    bullet_record.splice(bullet_record.length - 1, 1)
                }
            }
        }

        if (liveFlag && liveFlag.innerHTML == '直播已结束') {
            // 弹幕抽奖
            function luckDraw(arr) {
                let res = arr.map(v => {
                    return v.split('：')[0].slice(0, -1)
                })
                return res[getRandomNum(0, res.length - 1)]
            }
            let luckyDog = luckDraw(bullet_record)
            // 直播间在线平均人数统计
            let endTime = Date.now()
            // 直播时长=>弹幕助手运行时长
            let liveDuration = (endTime - startTime) / 1000
            // 时间戳转时长格式

            let averageOnlineNum = parseInt(eval(onlineNum2.join('+')) / (onlineNum2.length -
                1)) //去掉第一项0
            // 最高在线人数
            let maximumOnlineNum = Math.max(...onlineNum2)
            let obj = {}
            let obj2 = {}
            let count = 0
            let num = 1
            let bullets = bullet_record
            let reg = /下载|版本/ig
            bullet_record.forEach(v => {
                let bulletsContent = v.split('：')[1]
                let userName = v.split('：')[0]
                obj2[userName] = bulletsContent
                if (reg.test(bulletsContent)) {
                    count++
                }
                obj[num++] = userName + '：' + bulletsContent
            })
            let spokesman = Object.keys(obj2).length
            // 数据分析
            let analysis =
                `本场直播时长：${liveDuration}秒；本场直播场观：${nicknameOfAudience.length}人次；弹幕量：${bullets.length}；评论人数：${spokesman}；弹幕抽奖幸运儿：${luckyDog}；最高在线人数：${maximumOnlineNum}；平均在线人数：${averageOnlineNum}；问下载版本的人次：${count}；游戏下载相关弹幕占比：${(count/bullets.length*100).toFixed(2)}%`
            obj.analysis = analysis
            let div = document.createElement('div')
            div.style.color = 'white'
            div.style.fontWeight = 700
            div.style.marginTop = '100px'
            div.style.position = 'absolute'
            div.style.padding = ' 50px'
            div.style.backgroundColor = 'black'
            // 最上层显示
            div.style.zIndex = 999999
            // 观众ID
            let str = ''
            for (const key in nicknameOfAudience) {
                str += `
              <p> ${nicknameOfAudience[key].nickname}------${nicknameOfAudience[key].time}</p>                
                `
            }

            let html = ''
            for (const key in obj) {
                html += `
<p>${key}<====>${obj[key]}</p>

      `
            }
            div.innerHTML = `
<p style="color:red;font-size=30px">观众昵称：</p>
<br>
<p>${str}</p>
<br>
<p style="color:purple;font-size=30px">本场直播弹幕数据：</p>
<br>
<p>${html}</p>
            `



            document.body.insertBefore(div, document.body.children[0])
            // console.log(`%c${JSON.stringify(analysis)}`, "color: blue; font-size: x-large");
            // 直播结束再自动打开控制台暴露数据
            // 清除所有定时器
            clearInterval(bullet_record_Interval)
            clearInterval(bullet_chat_Interval)
            clearInterval(welcome_Interval)
            clearInterval(gift_box_Interval)
            clearInterval(onlinePeopleInterval)
            clearInterval(broadcastRankingInterval)
            clearInterval(onlinePeopleInterval2)
            clearInterval(fieldViewInterval)

        }
    }, 10)
    // 部分弹幕朗读和关键词自动答复
    let bullet_chat_Interval = setInterval(() => { //弹幕不全
        let bullet_chat_box = document.querySelector(
            '.webcast-chatroom___items>div:nth-child(1)>div:last-child')
        if (bullet_chat_box) {
            let speakername = bullet_chat_box.querySelector('.LU6dHmmD')
            speakername = speakername ? speakername.innerHTML.split('：')[0] : null
            let speaker_bullet_chat = bullet_chat_box.querySelector(
                '.webcast-chatroom___content-with-emoji-text')
            speaker_bullet_chat = speaker_bullet_chat ? speaker_bullet_chat.innerHTML : null
            // 弹幕朗读
            if (speaker_bullet_chat != null) {
                let str = `${speakername}说：${speaker_bullet_chat}`
                bullet_chat.push(speaker_bullet_chat)
                if (bullet_chat[bullet_chat.length - 1] !== bullet_chat[bullet_chat.length -
                        2]) { //防止重复最后一句话弹幕量甚少的情况下
                    // 关键字自动答复 
                    if (keyword_preset[0].test(str)) {
                        bulletaudio.src = youdaospeaker_src(`${str}:点击主播头像，同款自制Mod商品橱窗或者主页介绍有`)
                    } else if (keyword_preset[1].test(str)) {
                        bulletaudio.src = youdaospeaker_src(
                            `${str}:主播自制的-红警2AI的复仇豪华版，这个MOD自带模式136种，地图两百多张，防守图五十多张，并且有两套人工智能AI可选，自带鼠标连点效果、有游戏在线时长统计功能、配备贴心的红警助手更是可以让你畅玩无阻。最重要的是电脑非常的厉害，可打遍四海红警玩家哦`
                        )
                    } else if (keyword_preset[2].test(str)) {
                        bulletaudio.src = youdaospeaker_src(`${str}:百度有很多教程，也可以私聊主播`)
                    } else if (keyword_preset[3].test(str)) {
                        bulletaudio.src = youdaospeaker_src(`欢迎${speakername}`)
                    } else if (keyword_preset[4].test(str)) {
                        // 触发bgm
                        musicAudio.src = musicAudioSrcObj['victory']
                        musicAudio.play()
                    } else if (keyword_preset[5].test(str)) {
                        // 触发bgm
                        musicAudio.src = musicAudioSrcObj['正能量']
                        musicAudio.play()
                    } else if (keyword_preset[6].test(str)) {
                        bulletaudio.src = youdaospeaker_src(
                            `${str}:咦...主播不是菜鸡也不是什么菜鸟，我觉得你才是菜鸟鸡呢，哈哈哈哈`)
                    } else if (keyword_preset[7].test(str)) {
                        // 触发bgm
                        musicAudio.src = musicAudioSrcObj['冲锋']
                        musicAudio.play()
                    } else {
                        // 屏蔽词，防止直播间朗读违规弹幕
                        bulletaudio.src = youdaospeaker_src(shield_dangerous_comment(str))
                    }
                    // .....
                    bulletaudio.play()
                }
            }
        }
    }, 5000)
    // 礼物答谢功能
    let gift_box_Interval = setInterval(() => {
        let gift_box = document.querySelectorAll('.c3MAzcwU>div')
        let special_effect_gift = document.querySelector('.k39tYB7H')
        // 大礼物答谢带bgm
        if (special_effect_gift.innerHTML) {
            giftAudio1.volume = 0.5
            giftAudio2.volume = 0.5
            musicAudio.src = config.thanksMusic
            musicAudio.play()
            myaudio.src = youdaospeaker_src(
                `oh,my gold,非常感谢老板送的礼物，老板大气，祝老板${blessings[getRandomNum(0,blessings.length-1)]}${blessings[getRandomNum(0,blessings.length-1)]}`
            )

            myaudio.play()
        }

        let gift_box1 = gift_box[0]
        let thank_you_content1 = ``
        if (gift_box1.innerHTML) {
            let gift_username = gift_box1.querySelector('.HHmbDuaB')
            if (gift_username) {
                gift_username = gift_username.innerHTML
            }
            let gift_num = gift_box1.querySelector('.ZSDekCnx')
            let gift_type = gift_box1.querySelector('.Rur6lsEA')
            if (gift_type) {
                gift_type = gift_type.innerHTML
            }
            if (gift_num) {
                // 非粉丝灯牌
                gift_num = gift_num.innerHTML

                let blessingsStr = `祝老板${blessings[getRandomNum(0,blessings.length-1)]}`

                thank_you_content1 =
                    `感谢${shield_dangerous_comment(gift_username)}送的${gift_num}个${gift_type}`
                giftAudio1.src = youdaospeaker_src(
                    `${thank_you_content1},${blessingsStr}`
                )
                giftAudio1.volume = 1
                giftAudio1.play()
            } else {
                // 粉丝灯牌
                thank_you_content1 = `感谢${shield_dangerous_comment(gift_username)}送的${gift_type}`
                giftAudio1.src = youdaospeaker_src(thank_you_content1)
                giftAudio1.volume = 1
                giftAudio1.play()
            }

        }
        let gift_box2 = gift_box[1]
        let thank_you_content2 = ``
        if (gift_box2.innerHTML) {
            let gift_username2 = gift_box2.querySelector('.HHmbDuaB')
            if (gift_username2) {
                gift_username2 = gift_username2.innerHTML
            }
            let gift_num2 = gift_box2.querySelector('.ZSDekCnx')
            let gift_type2 = gift_box2.querySelector('.Rur6lsEA')
            if (gift_type2) {
                gift_type2 = gift_type2.innerHTML
            }
            if (gift_num2) {
                // 非粉丝灯牌
                gift_num2 = gift_num2.innerHTML
                // 细分礼物大礼物答谢多点
                let blessingsStr = `祝老板${blessings[getRandomNum(0,blessings.length-1)]}`

                thank_you_content2 =
                    `感谢${shield_dangerous_comment(gift_username2)}送的${gift_num2}个${gift_type2}`
                giftAudio2.src = youdaospeaker_src(
                    `${thank_you_content2},${blessingsStr}`
                )
                giftAudio2.volume = 1
                giftAudio1.addEventListener('ended', () => {
                    giftAudio2.play()
                })

            } else {
                // 粉丝灯牌
                thank_you_content2 = `感谢${shield_dangerous_comment(gift_username2)}送的${gift_type2}`
                giftAudio2.src = youdaospeaker_src(thank_you_content2)
                giftAudio2.volume = 1
                giftAudio1.addEventListener('ended', () => {
                    giftAudio2.play()
                })
            }

        }
    }, 5000)
    // 不同等级用欢迎功能
    let welcome_Interval = setInterval(() => {
        let someoneSpan = document.querySelector('.webcast-chatroom___bottom-message .LU6dHmmD');
        let someone = ''
        if (someoneSpan && someoneSpan != '') {
            someone = someoneSpan.innerHTML
        }
        // 可以获取进来的人数
        people.push(someone)
        // 防止人数进来多重复读取
        if (people[people.length - 1] !== people[people.length - 2] && people.length != 0) {
            // 最后一个防止溢出一般不会
            people = people.slice(-1)
            let username = people[people.length - 1]

            // 普通游客带等级
            let img = document.querySelectorAll('.webcast-chatroom___bottom-message img');
            if (img[0] && img[1] && img[2]) { // 既有灯牌也是房管的
                let webcast_admin_badge = img[0]
                let housing_management_userLevel = img[1].src
                let housing_management_lampLevel = img[2].src
                // 必须是config.fanLampName的
                let fanLampName = document.querySelector(
                    '.webcast-chatroom___bottom-message .IK03Li9C .I1YlCmYh').innerHTML;
                housing_management_userLevel = housing_management_userLevel.split('.png')[0].split(
                    '_')[housing_management_userLevel.split('.png')[0].split('_').length - 1]
                housing_management_lampLevel = housing_management_lampLevel.split('.png')[0].split(
                    '_')[housing_management_lampLevel.split('.png')[0].split('_').length - 1]

                if (webcast_admin_badge && housing_management_userLevel > config.userLevel &&
                    housing_management_lampLevel >
                    config.lampLevel && fanLampName == config.fanLampName) {
                    interval = 6000
                    myaudio.src = youdaospeaker_src(
                        `欢迎${shield_dangerous_comment(username)}来看老弟,祝老板${blessings[getRandomNum(0,blessings.length-1)]}${blessings[getRandomNum(0,blessings.length-1)]}`
                    )
                } else {
                    myaudio.src = youdaospeaker_src(
                        `欢迎${shield_dangerous_comment(username)}来看老弟`
                    )
                    interval = 3000
                }
            } else if (img[0] && img[1]) { // 有粉丝灯牌 
                let with_fan_lamp_userLevel = img[0]
                let with_fan_lamp_lampLevel = img[1].src
                // 必须是config.fanLampName的
                let fanLampName = document.querySelector(
                    '.webcast-chatroom___bottom-message .IK03Li9C .I1YlCmYh').innerHTML;
                with_fan_lamp_lampLevel = with_fan_lamp_lampLevel.split('.png')[0].split('_')[
                    with_fan_lamp_lampLevel.split('.png')[0].split('_').length - 1]

                if (with_fan_lamp_lampLevel > config.lampLevel && fanLampName ==
                    config.fanLampName) {
                    interval = 4000
                    myaudio.src = youdaospeaker_src(
                        `欢迎${shield_dangerous_comment(username)}来看老弟,祝老板${blessings[getRandomNum(0,blessings.length-1)]}`
                    )
                } else if (fanLampName == config.fanLampName && with_fan_lamp_lampLevel <= config
                    .lampLevel) {
                    myaudio.src = youdaospeaker_src(
                        `欢迎${shield_dangerous_comment(username)}来看老弟`
                    )
                } else {
                    myaudio.src = ''
                    interval = 3000
                }
            } else if (img[0]) { //普通用户不带粉丝灯牌
                let level = img[0].src
                level = level.split('.png')[0].split('_')[
                    level.split('.png')[0].split('_').length - 1]
                if (level > config.userLevel) { //等级大于20
                    interval = 5000
                    myaudio.src = youdaospeaker_src(
                        `欢迎${shield_dangerous_comment(username)}`
                    )
                } else {
                    // 不欢迎
                    myaudio.src = ''
                    interval = 3000
                }
            }
            // 普通游客不带等级
            let ordinary_tourists_without_grade = document.querySelector(
                '.webcast-chatroom___bottom-message img');
            if (!ordinary_tourists_without_grade) {
                // 不欢迎
                myaudio.src = ''
            }

            myaudio.play()
        }
    }, interval) //2秒欢迎xxx读完 2秒内没人进来就读完整个语录
})()
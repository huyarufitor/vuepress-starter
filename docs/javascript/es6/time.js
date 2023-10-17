function calculateDuration(start, end) {
    const [startHour, startMinute] = start.split(':');
    const [endHour, endMinute] = end.split(':');
    const startTime = new Date(0, 0, 0, startHour, startMinute);
    const endTime = new Date(0, 0, 0, endHour, endMinute);
    const durationInMs = endTime - startTime;
    const durationInHours = (durationInMs / (1000 * 60 * 60));
    return durationInHours.toFixed(2)-1.5;
  }
  console.log(calculateDuration('09:51:00','19:00:00'))
/**09:56,19:52 --8.4
 09:57,19:20 --7.9
09:51,19:51 --8.5
09:51,19:46 --8.4
09:52,19:47 --8.4
09:52,20:04 --8.7
09:52,19:01 --7.7
09:57,19:40 --8.2
09:58,19:10;--7.7
外出(下午)
 09:52,19:46 --8.4
09:56,20:22 --8.9
 09:58,20:39 --9.2
09:56,19:32 --8.1
调休假(全天)
 09:56,19:33 --8.1
09:56,18:59 --7.6
09:56,19:08 --7.7
09:56,20:43 --9.3
09:30,19:48 --8.8
09:57,19:47 --8.3
09:58,19:10 --7.7
09:53,19:05 --7.7
09:55,19:10 --7.8
*/
//----22d 181.5 平均8.25
//
  //
//   console.log(calculateDuration('09:57','19:20'))
  //--7.9
//   console.log(calculateDuration('09:56','19:52'))--8.4
//   console.log(calculateDuration('09:56','19:52'))--8.4

// 9.45-20:20 ---9.1
// export const SEARCH_FORM_ITEM = [
//   {
//     item_type: 'select',
//     label: 'APP应用',
//     key: 'app_key',
//     options: [],
//     clearable: true,
//     multiple: true,
//     remote: true,
//     filterable: true,
//     disable: true,
//     remoteMethod: async(val, { item }) => {
//       const { data, code } = await getAllAppidList({
//         key: val, has_related_company: 0
//       })
//       if (code === 200) {
//         const { list } = data || { list: [] }
//         item.options = list.map(item => {
//           return {
//             label: `(${item.appid})${item.app_name}`,
//             value: item.appid
//           }
//         })
//       }
//     }
//   },
//   {
//     item_type: 'date-picker',
//     label: '规则起效时间',
//     key: 'valid_at',
//     disable: true,
//     clearable: true,
//     type: 'date',
//     value_format: 'yyyy-MM-dd',
//     format: 'yyyy-MM-dd',
//     pickerOptions: {
//       // disabledDate(time) {
//       //   return time.getTime() > Date.now()
//       // }
//     }
//   },
//   {
//     label: 'Finance Beginday',
//     label_width: '',
//     item_type: 'input',
//     key: 'finance_beginday'
//   },
//   {
//     label: 'Overseas',
//     label_width: '',
//     key: 'overseas',
//     item_type: 'radio_group',
//     childrens: [
//       {
//         value: 0,
//         text: '国内'
//       },
//       {
//         value: 1,
//         text: '海外'
//       }
//     ]
//   },
//   {
//     label: 'Charge Desc',
//     label_width: '',
//     item_type: 'custom-item',
//     key: 'charge_desc',
//     slot: 'charge_desc'
//   },
//   {
//     label: '计费说明',
//     label_width: '',
//     key: 'memo',
//     item_type: 'custom-item',
//     slot: 'memo'
//   },
//   {
//     label: '规则列表',
//     label_width: '',
//     key: 'rules_detail',
//     item_type: 'custom-item',
//     slot: 'rules_detail'
//   },
//   {
//     label: '连麦赠送时长(分钟)',
//     label_width: '',
//     item_type: 'input',
//     key: 'lmfen_gift'
//   },
//   {
//     label: '连麦总时长（万分钟）折扣公式, 结果取值[0,100]。如85表示打八五折, <0或>=100表示没有折扣。',
//     label_width: '',
//     item_type: 'input',
//     key: 'lmfen_peroff_math'
//   },
//   {
//     label: '连麦总时长折扣公式说明',
//     label_width: '',
//     item_type: 'input',
//     key: 'lmfen_peroff_desc'
//   },
//   {
//     label: '折扣。取值[0,100]。如85表示打八五折, <=0或>=100表示没有折扣。',
//     label_width: '',
//     item_type: 'input',
//     key: 'percent_off'
//   },
//   {
//     label: '税点。取值[0,100]。6表示加6个税点。0表示含税价,不需额外付税。',
//     label_width: '',
//     item_type: 'input',
//     key: 'tax'
//   },
//   {
//     label: '结算公式',
//     label_width: '',
//     item_type: 'input',
//     key: 'final_math'
//   },
//   {
//     label: '结算公式说明',
//     label_width: '',
//     item_type: 'input',
//     key: 'final_desc'
//   }
// ]
// export const arr = [
//   {
//     billing_desc: '刊例价，360P ＜ 分辨率 ≤ 720P，含转推cdn/混流/录制/云录制，不含L3',
//     billing_item_group_id: [1, 8],
//     billing_item_group_name: ['刊例价，含转推cdn/混流/录制/云录制，不含L3', '刊例价，含转推cdn/混流/录制/云录制，不含L3,扣除i帧相关的视频时长'],
//     billing_type: '时长',
//     billing_type_id: 3,
//     billing_type_name: '连麦-时长',
//     biz_region: '国内\n海外',
//     biz_type: 1,
//     class_id: 37,
//     class_name: 'RTC实时音视频',
//     code: 'm_lm_fen_k_361_720',
//     group_code: '',
//     is_regular_billing: true,
//     measure_rule: '按流累计',
//     measure_unit_id: 1,
//     measure_unit_name: '千分钟',
//     name: 'RTC：高清（HD）分钟',
//     name_eng: 'RTC: HD video service (mins)',
//     publication_price_rmb: 25,
//     publication_price_usd: 3.57,
//     recommendation_type: 1,
//     recommendation_type_desc: '官网推荐给客户的计费项',
//     recommendation_type_name: '刊例推荐',
//     second_billing_type_id: 9,
//     second_billing_type_name: '流',
//     second_class_id: 38,
//     second_class_name: '连麦',
//     service_grade: ''
//   }
// ]
// export const result = [
//   {
//     class_name: 'RTC实时音视频',
//     child_one: [
//       {
//         class_name: '连麦',
//         child_two: [
//           {
//             class_name: '刊例价，含转推cdn/混流/录制/云录制，不含L3',
//             child_three: [
//               {
//                 billing_desc: '刊例价，360P ＜ 分辨率 ≤ 720P，含转推cdn/混流/录制/云录制，不含L3',
//                 billing_item_group_id: [1, 8],
//                 billing_item_group_name: ['刊例价，含转推cdn/混流/录制/云录制，不含L3', '刊例价，含转推cdn/混流/录制/云录制，不含L3,扣除i帧相关的视频时长'],
//                 billing_type: '时长',
//                 billing_type_id: 3,
//                 billing_type_name: '连麦-时长',
//                 biz_region: '国内\n海外',
//                 biz_type: 1,
//                 class_id: 37,
//                 class_name: 'RTC实时音视频',
//                 code: 'm_lm_fen_k_361_720',
//                 group_code: '',
//                 is_regular_billing: true,
//                 measure_rule: '按流累计',
//                 measure_unit_id: 1,
//                 measure_unit_name: '千分钟',
//                 name: 'RTC：高清（HD）分钟',
//                 name_eng: 'RTC: HD video service (mins)',
//                 publication_price_rmb: 25,
//                 publication_price_usd: 3.57,
//                 recommendation_type: 1,
//                 recommendation_type_desc: '官网推荐给客户的计费项',
//                 recommendation_type_name: '刊例推荐',
//                 second_billing_type_id: 9,
//                 second_billing_type_name: '流',
//                 second_class_id: 38,
//                 second_class_name: '连麦',
//                 service_grade: ''
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ]

// let result = []

// arr.forEach(item => {
//   const {
//     class_name,
//     second_class_name,
//     billing_item_group_name
//   } = item

//   // 获取对应的一级类目结构
//   let parent = result.find(item => item.class_name === class_name)
//   if (!parent) {
//     parent = {
//       class_name
//     }
//     result.push(parent)
//   }

//   // 获取对应的二级类目结构
//   let childOne = parent.child_one?.find(item => item.class_name === second_class_name)
//   if (!childOne) {
//     childOne = {
//       class_name: second_class_name
//     }
//     parent.child_one = parent.child_one || []
//     parent.child_one.push(childOne)
//   }

//   // 获取对应的三级类目结构
//   let childTwo = childOne.child_two?.find(item => item.class_name === billing_item_group_name)
//   if (!childTwo) {
//     childTwo = {
//       class_name: billing_item_group_name
//     }
//     childOne.child_two = childOne.child_two || []
//     childOne.child_two.push(childTwo)
//   }

//   // 将数据放入三级类目下
//   childTwo.child_three = childTwo.child_three || []
//   childTwo.child_three.push(item)
// })
// console.log(result)
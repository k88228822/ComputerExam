
export const BASE_URL='http://115.159.211.47:9097';

//获取轮播图
export const BANNER_LIST = `${BASE_URL}/getBanner`;

//距离考试的天数
export const DAYS= `${BASE_URL}/date/getExamDate`;

//搜索
export const SEARCH= `${BASE_URL}/getSubject`;

//推荐
export const RECOMMENDS= `${BASE_URL}/subject/getRecommendSearchKeyWord?total=10`;

//用户信息
export const USER_INFO= `${BASE_URL}/getUserInfo`;

//官方快讯
export const OFFICIAL_MSG= `${BASE_URL}/getOfficialMsg`;

//官方教材章节目录
export const OFFICIAL_BOOK= `${BASE_URL}/getOfficialBook`;

//获取真题和模拟题目录
export const MOCK_AND_OFFICIAL= `${BASE_URL}/subject/getIssueDirBySubjectIdAndKind`;

//获取章节或者真题模拟题目下的全部题目
export const MOCK_OR_OFFICIAL_TEST= `${BASE_URL}/subject/getQuestionGroup/By/SubIdAndDirId`;






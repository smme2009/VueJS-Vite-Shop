/**
 * 格式化數字
 * 
 * @param {int} number 數字
 * 
 * @returns {string} 格式化數字
 */
export function formatNumber(number) {
    const formatNumber = Intl.NumberFormat('zh-TW').format(number);

    return formatNumber;
}
let nums1 = [0,0,0];
let m = 0;
let nums2 = [2,2,3];
let n = 3;
var merge = function(nums1, m, nums2, n) {
    let i = m - 1;// 标识nums1的下标
    let j = n - 1;//标识nums2的下标
    let k = m + n - 1;
    while (i >= 0 && j >= 0) {
        //处理两个数组都有值的时候合并
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
            console.log('1');
        } else {
            nums1[k] = nums2[j];
            j--;
            console.log('2');
        }
        k--;
    }
    //处理nums1数组没有有效元素，nums2数组不为空的情况
    while(j>=0){
        nums1[k] = nums2[j];
        j--;
        k--;
    }
    console.log('nums1',nums1);
};
merge(nums1,m,nums2,n);
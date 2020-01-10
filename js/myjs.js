$(
            function () {
                $("#b1").click(
                    function () {
                        var a = $("#t1").val(), b = $("#t2").val(), c, my_keys, c;
                        if (a == "") {
                            alert("解密时，密文不能为空");
                            return;
                        }
                        my_keys = get_Key(b);
                        c = test3(a, my_keys);
                        $("#t1").val(c);
                    }
                );
                $("#b2").click(
                    function () {
                        var a = $("#t1").val(), b = $("#t2").val(), c, my_keys;
                        if (a == "") {
                            alert("加密时，明文不能为空");
                            return;
                        }
                        my_keys = get_Key(b);
                        c = test2(a, my_keys);
                        $("#t1").val(c);
                    }
                );
                $("#b3").click(
                    function () {
                        $("#t1").val("");
                        $("#t2").val("");
                    }
                );
                $("#c1").click(
                    function () {
                        if ($("#c1").prop("checked")) {
                            $("#t2").attr("type", "text");
                        }
                        else {
                            $("#t2").attr("type", "password");
                        }
                    }
                );
            }
        );
        function test1(a, b) {
            return a + b;
        }
        //加密
        //把字符串x，每个字符，移动字符串y数组对应的数字，返回数字字符串
        //如：“102,105,106”
        function test2(x = "", y = ["0"]) {
            var t, r = "";
            var myarray = new Array();
            //按照y的数组长度给数组myarray赋初始值0，该数组元素指向y中对应维度的位置
            for (i = 0; i < y.length; i++) {
                myarray[i] = 0;
            }
            for (i = 0; i < x.length; i++) {
                t = x.charCodeAt(i);
                for (k = 0; k < y.length; k++) {
                    if (k == y.length - 1) {
                        t += y[k].charCodeAt(myarray[k]);
                    }
                    else {
                        t *= y[k].charCodeAt(myarray[k]);
                    }
                    myarray[k] = (myarray[k] + 1) % y[k].length;
                }
                r += t + ",";
            }
            return r.substring(0, r.length - 1);
        }
        //解密
        //把字符串x，每个字符，反向移动字符串y数组对应的数字，返回字符串
        //如：“102,105,106”->"abc"之类。。。
        function test3(x = "", y = ["0"]) {
            var t = x.split(","), r = "", t1;
            var myarray = new Array();
            for (i = 0; i < y.length; i++) {
                myarray[i] = 0;
            }
            for (i = 0; i < t.length; i++) {
                t1 = Number(t[i]);
                //解密所需要的除数
                step1 = 1;
                //解密所需要的减数
                step2 = 0;
                for (k = 0; k < y.length; k++) {
                    if (k == y.length - 1) {
                        step2 += y[k].charCodeAt(myarray[k]);
                    }
                    else {
                        step1 *= y[k].charCodeAt(myarray[k]);
                    }
                    myarray[k] = (myarray[k] + 1) % y[k].length;
                }
                t1 = (t1 - step2) / step1;
                r += String.fromCharCode(t1);
            }
            return r;
        }
        //根据密码，获取密钥数组
        function get_Key(x = "") {
            var r, key1, key2, key3, t;
            t = Reverse(x);
            key1 = $.md5(x);
            key2 = $.md5(t);
            key3 = $.md5(x + t);
            //移位操作，把"123","456","789"变为"12","456","7893"
            t = key1.substr(key1.length - 1, 1);
            key1 = key1.substr(0, key1.length - 1);
            key3 += t;
            //移位结束
            r = [key1, key2, key3];
            return r;
        }
        //字符串转置
        function Reverse(str) {
            var len = str.length;
            var result = "";
            if (len == 0) {
                return null;
            }
            while (--len >= 0) {
                result += str.charAt(len);
            }
            return result;
        }
<template>
  <div>
    <el-row>
      <!--地址查询条件-->
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkBoxProvinces" size="mini">
          <!--label绑定province的id，el-checkbox-group才能获取到id-->
          <el-checkbox-button v-for="province in provinceList" :label="province.id" :key="province.id">{{province.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </el-row>
    <el-row>
    <!--查询条件-->
    <div style="margin-top: 15px; margin-bottom:20px; width:40%; display:inline-block">
      <el-input placeholder="请输入内容" v-model="queryInfo.keyword" class="input-with-select">
        <el-select v-model="queryInfo.queryType" slot="prepend" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getUserListByUserInfo"></el-button>
      </el-input>
    </div>
    </el-row>
    <!--Layout布局-->
    <el-row>
      <el-col :span="7" v-for="user in userList" :key="user.id" :offset="1">
        <el-card>
          <img :src="user.img" class="image">
            <div class="user_info" style="font-size:16px">{{user.title}}</div>
            <div class="user_info">地址:{{user.dz}}</div>
            <div class="user_info">日期:{{user.createTime}}</div>
            <div class="user_info">颜值:{{user.faceValue}}</div>
            <div class="user_info">年龄:{{user.age}}</div>
            <div class="user_info">电话:{{user.phone}}</div>
            <div class="user_info">QQ:{{user.qq}}</div>
            <div class="user_info">微信:{{user.wechat}}</div>
            <div class="user_info">价格:{{user.price}}</div>
            <hr>
            <div class="user_info">描述:{{user.process}}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <!--分页区域-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNo"
        :page-sizes="[1, 2, 5, 10, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { userList,provinceList } from "@/api/user";
export default {
  data() {
    return {
      userList: [], // 用户列表
      total: 0, // 用户总数
      // 获取用户列表的参数对象
      queryInfo: {
        queryType: 1, //默认以关键字查询
        keyword: '', // 查询参数
        provinceIds: [], // 省份id
        pageNo: 1, // 当前页码
        pageSize: 5, // 每页显示条数
      },
      provinceList: [], // 省份列表
      checkBoxProvinces: [],
      options: [
        {
          id:1,
          value:1,
          label:'关键字'
        },
        {
          id:2,
          value:2,
          label:'联系方式'
        },
        {
          id:3,
          value:3,
          label:'位置'
        }
      ]
    };
  },
  created() {
    // 生命周期函数
    this.getUserList();
    this.getProvinceList();
  },
  methods: {
    getUserList() {
      userList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            //用户列表
            this.userList = res.data.data.records;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 通过用户信息查询用户
    getUserListByUserInfo() {
      // 当点击查询按钮时，把选中的省份id赋值给查询参数
      this.queryInfo.provinceIds = this.checkBoxProvinces
      userList(this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
            //用户列表
            this.userList = res.data.data.records;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询所有省份信息
    getProvinceList(){
      provinceList().then((res) => {
        if (res.data.code === 200) {
          this.provinceList = res.data.data
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize;
      // 重新发起请求用户列表
      this.getUserList();
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNo = newPage;
      // 重新发起请求用户列表
      this.getUserList();
    },
  },
};
</script>

<style>
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    float: left;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }


  .user_info {
    font-size: 13px;
    margin-top: 2px
  }

  .el-card {
  min-height: 100%;
  height: 100%;
  width: 400px;
  margin-bottom: 5%;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

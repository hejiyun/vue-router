<template>
  <div :style="{'background': themeColor}" class="heaerer">
    <div :class="collapse ? 'ml65 headbar' : 'headbar ml200'">
      <!-- 导航收缩 -->
      <span class="hamburg">
        <span class="collapse-switcher" @click.prevent="onCollapse">
          <i class="el-icon-menu"/>
        </span>
      </span>
      <!-- 导航菜单
      <span class="navbar">
      </span> -->
      <!-- 工具栏 -->
      <span class="toolbar" style="width:300px">
        <el-row>
          <el-col :span="6">
            <span class="el-dropdown-link">
              <ThemePicker @onThemeChange="onThemeChange"/>
            </span>
          </el-col>
          <el-col :span="6">
            <el-dropdown trigger="click" @command="changeLanguage">
              <span class="el-dropdown-link" style="color:white">
                <i class="fa fa-language fa-lg"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh">
                  中文
                </el-dropdown-item>
                <el-dropdown-item command="en">
                  English
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="10" style="padding: 10px;">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
          </el-col>
        </el-row>
        <!-- -->
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ThemePicker from '@/components/ThemePicker'
export default {
  name: 'HeaderBar',
  components: {
    ThemePicker
  },
  data() {
    return {
      user: {
        name: 'Louis',
        avatar: '',
        role: '超级管理员',
        registeInfo: '注册时间：2018-12-20 '
      },
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState({
      themeColor: state => state.app.themeColor,
      collapse: state => state.app.collapse
    })
  },
  methods: {
    openWindow(url) {
      window.open(url)
    },
    selectNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    // 折叠导航栏
    onCollapse: function() {
      this.$store.commit('collapse')
    },
    // 切换主题
    onThemeChange: function(themeColor, oldThemeColor) {
      this.$store.dispatch('onThemeChange', { themeColor, oldThemeColor })
    },
    // 语言切换
    changeLanguage(lang) {
      console.log('dianjile')
      lang === '' ? 'zh' : lang
      this.$i18n.locale = lang
    }
  }
}
</script>

<style scoped lang="scss">
.headbar {
  position: absolute;
  left: 200px;
  right: 0px;
  height: 60px;
  line-height: 60px;
  .collapse-switcher {
    width: 40px;
    float: left;
    cursor: pointer;
    border-color: rgba(111, 123, 131, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
    border-right-width: 1px;
    border-right-style: solid;
    color: white;
    background: #504e6180;
  }
.hamburg, .navbar {
  float: left;
  text-align: center;
}
.toolbar {
  float: right;
}
.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.lang-item:hover {
  font-size: 18px;
  background: #b0d6ce4d;
}
.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
}
.badge {
  line-height: 18px;
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
}
.headbar.ml65{
  left: 65px;
}
.headbar.ml200{
  left: 200px;
}
.heaerer{
  width: 100%;
  height: 60px;
}
</style>

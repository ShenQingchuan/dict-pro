import React from 'react'
import './Header.scss'
import { Image, Dropdown } from 'semantic-ui-react'

const mockAvatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-24zVWocAtJ1XfNwy_Dik0UL-RATVgHHaDpCj-VyBvxlE_C5u&usqp=CAU'

function Header() {
  return (
    <div className="flex-box algn-center jy-btwn component-header">
      <div className="flex-box algn-center logo">
        <img src={require('../../logo.png')} alt=""/>
        专业英语翻译助手
      </div>
      <div className="flex-box algn-center actions-bar">
        <div className="action">我要贡献</div>
        <div className="action">单词收藏夹</div>
        <Dropdown className="drop-menu" text='用户中心'>
          <Dropdown.Menu>
            <Dropdown.Item text='会员服务' />
            <Dropdown.Divider />
            <Dropdown.Item text='退出登录' />
          </Dropdown.Menu>
        </Dropdown>
        {
          localStorage.getItem('dictPro-auth') === '1'
          ? <Image className="header-avatar" src={mockAvatarUrl} avatar />
          : void 0
        }
      </div>
    </div>
  )
}

export default Header


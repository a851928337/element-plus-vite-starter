
import { Node } from '../utils/editor';

export const mockWordJson: Node[] = [
  {
    type: 'heading',
    text: '大型企业技术架构升级方案',
    children: [
      {
        type: 'paragraph',
        text: '本文档详细说明了集团技术架构的升级方案，包括系统重构、性能优化、安全加固等多个方面。'
      },
      {
        type: 'heading',
        text: '一、现状分析',
        children: [
          {
            type: 'heading',
            text: '1.1 系统架构现状',
            children: [
              {
                type: 'paragraph',
                text: '目前系统存在以下问题：'
              },
              {
                type: 'list',
                marker: 'dot',
                children: [
                  {
                    text: '系统耦合度高',
                    children: [
                      { text: '模块间依赖复杂' },
                      { text: '难以独立部署' },
                      { text: '维护成本高' }
                    ]
                  },
                  {
                    text: '性能瓶颈',
                    children: [
                      { text: '数据库连接池配置不合理' },
                      { text: '缓存策略待优化' },
                      { text: '部分SQL语句未优化' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'heading',
            text: '1.2 业务痛点',
            children: [
              {
                type: 'list',
                marker: 'num',
                children: [
                  { text: '系统响应速度慢' },
                  { text: '功能扩展困难' },
                  {
                    text: '运维压力大',
                    children: [
                      { text: '发布流程复杂' },
                      { text: '回滚机制不完善' },
                      { text: '监控体系不健全' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'heading',
        text: '二、升级方案',
        children: [
          {
            type: 'heading',
            text: '2.1 技术架构升级',
            children: [
              {
                type: 'paragraph',
                text: '采用以下技术栈进行系统重构：'
              },
              {
                type: 'list',
                marker: 'num',
                children: [
                  {
                    text: '微服务架构',
                    children: [
                      { text: '服务注册与发现：Nacos' },
                      { text: '网关：Spring Cloud Gateway' },
                      { text: '服务调用：gRPC' },
                      {
                        text: '容器化部署',
                        children: [
                          { text: 'Kubernetes集群' },
                          { text: 'Docker容器' },
                          { text: 'Helm包管理' }
                        ]
                      }
                    ]
                  },
                  {
                    text: '数据层优化',
                    children: [
                      { text: '读写分离' },
                      { text: '分库分表' },
                      {
                        text: '多级缓存',
                        children: [
                          { text: 'JVM本地缓存' },
                          { text: 'Redis分布式缓存' },
                          { text: 'CDN边缘缓存' }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                type: 'paragraph',
                text: '技术架构图如下：'
              }
            ]
          },
          {
            type: 'heading',
            text: '2.2 安全体系建设',
            children: [
              {
                type: 'list',
                marker: 'dot',
                children: [
                  {
                    text: '身份认证',
                    children: [
                      { text: 'OAuth2授权' },
                      { text: 'JWT令牌' },
                      { text: '双因素认证' }
                    ]
                  },
                  {
                    text: '数据安全',
                    children: [
                      { text: '传输加密' },
                      { text: '存储加密' },
                      { text: '脱敏处理' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'heading',
    text: '三、实施计划',
    children: [
      {
        type: 'paragraph',
        text: '项目分三个阶段实施：'
      },
      {
        type: 'list',
        marker: 'num',
        children: [
          {
            text: '第一阶段（Q2）',
            children: [
              { text: '完成技术选型' },
              { text: '搭建基础框架' },
              { text: '核心模块重构' }
            ]
          },
          {
            text: '第二阶段（Q3）',
            children: [
              { text: '全面系统重构' },
              { text: '性能优化' },
              { text: '安全加固' }
            ]
          },
          {
            text: '第三阶段（Q4）',
            children: [
              { text: '系统集成测试' },
              { text: '灰度发布' },
              { text: '全量上线' }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'paragraph',
    text: '本方案仅供参考，具体实施细节需要根据实际情况调整。'
  },
  {
    type: 'list',
    marker: 'dot',
    children: [
      { text: '涉及公司核心技术架构，请勿外传' },
      { text: '实施过程中如有问题，及时反馈' },
      {
        text: '重要说明',
        children: [
          { text: '需要全员参与' },
          { text: '按时完成培训' },
          { text: '严格执行规范' }
        ]
      }
    ]
  }
];

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Avatar, Switch } from 'antd'
import { DropOption, TableFinder, Button, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }
  handleRuleClick = (record) => {
    const { onRuleList } = this.props
    onRuleList(record.id);
  }

  onSwitchChange = (record) => {
    const { onChecked } = this.prop
    onChecked(record.id,record.status);
  }

  render() {
    const { onDeleteItem, onEditItem, onRuleList, onChecked, onChange, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>协议名称</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      {
        title: <Trans>端口</Trans>,
        dataIndex: 'port',
        key: 'port',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      {
        title: <Trans>备注</Trans>,
        dataIndex: 'remark',
        key: 'remark',
        render: (text,record) => {
          return  <span>{text}</span>
        }
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'edit') {
              this.handleMenuClick(record, { key: '1' })
            } else if (key === 'del') {
              this.handleMenuClick(record, { key: '2' })
            }
          }
          return <Operation data={['edit', 'del']} onClick={onClick} />
        },
      },
    ]

    return (
      <TableFinder
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        columns={columns}
        onChange={onChange}
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onRuleList: PropTypes.func,
  onChecked: PropTypes.func,
  location: PropTypes.object,
}

export default List

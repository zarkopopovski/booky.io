import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import Base from '../Base';
import Label from '../../../atoms/label';
import Select from '../../../atoms/select';

class DeleteCategory extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = {
      id: props.data.id,
      newId: null,
      value: 0
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     id: nextProps.data.id,
  //     newId: null,
  //     value: 0
  //   });
  // }

  onChange(value) {
    this.setState({
      newId: value === '0' ? null : this.props.data.categories[value - 1].id,
      value
    });
  }

  render() {
    const { data, onClose, onSave, intl, pending } = this.props;
    const options = [
      {
        text: intl.formatMessage({ id: 'modal.deleteAll' }),
        value: '0'
      },
      ...data.categories.map(({name}, index) => ({
        text: `${intl.formatMessage({ id: 'modal.moveTo' })}: ${name}`,
        value: index + 1
      }))
    ];

    return (
      <Base
        onClose={ onClose }
        onSave={ () => { onSave(this.state); } }
        pending={ pending }
        headline={ intl.formatMessage({ id: 'modal.deleteCategory' }) }
        hasAnchor
      >
        <Label>
          <FormattedMessage id="modal.deleteCategoryLabel" /><br />
          <b>{ data.name }</b>
        </Label>
        <Select
          id="category-delete"
          label={ intl.formatMessage({ id: 'modal.deleteCategoryFuture' }) }
          options={ options }
          onChange={ this.onChange }
          selected="0"
        />
      </Base>
    );
  }
}

export default injectIntl(DeleteCategory);

DeleteCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  pending: PropTypes.bool
};
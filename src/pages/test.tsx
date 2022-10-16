import React, {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {noticeDetail} from '../config/AxiosFunction';

const source = {
  html: `
<p style='text-align:center;'>
  Hello World!
</p>
<div class="table-responsive" style="text-align:center;">
<table id="datatable-scroller"
	class="table table-bordered tbl_Form">
	<caption></caption>
	<colgroup>
		<col width="250px" />
		<col />
	</colgroup>
	<tbody>
		<tr>
			<th class="active" >작성자</th>
			<td>
			
			</td>
		</tr>
		<tr>
			<th class="active">제목</th>
			<td>
			
			</td>
		</tr>
		<tr>
			<th class="active" >내용</th>
			<td>
			
			</td>
		</tr>
	</tbody>
</table>
</div>`,
  noticeDetail,
};

export default function App() {
  const {width} = useWindowDimensions();
  useEffect(() => {
    noticeDetail(3).then(res => console.log(res));
  });
  return <RenderHtml contentWidth={width} source={source} />;
}

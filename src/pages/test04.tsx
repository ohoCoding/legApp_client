import React from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {RichTextEditor} from 'react-native-zss-rich-text-editor';

const TempScreen = () => {
  const richText = React.useRef(null);
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Text>Description:</Text>
          <RichTextEditor
            ref={r => richText}
            initialTitleHTML={'Title!!'}
            initialContentHTML={
              'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
            }
          />
        </KeyboardAvoidingView>
      </ScrollView>

      {/* <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
        ]}
        iconMap={{
          [actions.heading1]: ({tintColor}) => (
            <Text style={[{color: tintColor}]}>H1</Text>
          ),
        }}
      /> */}
    </SafeAreaView>
  );
};

export default TempScreen;

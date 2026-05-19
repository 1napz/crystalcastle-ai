port android.util.Log;
import android.util.TypedValue;
import android.util.Xml;
import androidx.annotation.WorkerThread;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

/** Gets authenticator types present on the device. */
class AuthenticatorTypesGetter {

  /** Returns all the authenticator types mapped to the package name present on the device. */
  @WorkerThread
  public Map<String, String> getAuthenticatorTypeToPackageNameMap(Context context) {
    // The top choice of system API is AccountManager.getAuthenticatorTypes(). However during a
    // Intent.ACTION_PACKAGE_ADDED broadcast the returned list is not up to date (b/30979262).
    // Go the long way and parse the authenticator metadata from PackageManager.
    PackageManager pm = context.getPackageManager();
    Intent authenticatorIntent = new Intent(AccountManager.ACTION_AUTHENTICATOR_INTENT);
    List<ResolveInfo> resolveInfos =
        pm.queryIntentServices(authenticatorIntent, PackageManager.GET_META_DATA);
    if (resolveInfos == null) {
      Log.e(Constants.TAG, "Unable to query authenticator types");
      return Collections.emptyMap();
    }
    Map<String, String> authenticatorTypesToPackageNameMap = new HashMap<>();
    for (ResolveInfo resolveInfo : resolveInfos) {
      XmlResourceParser parser =
          resolveInfo.serviceInfo.loadXmlMetaData(pm, AccountManager.AUTHENTICATOR_META_DATA_NAME);
      if (parser != null) {
        try {
          String packageName = resolveInfo.serviceInfo.packageName;
          String accountType = parseAccountType(pm, parser, packageName);
          authenticatorTypesToPackageNameMap.put(accountType, packageName);
        } catch (IOException | XmlPullParserException e) {
          // Shouldn't happen, parser returned by system should be well formed. Log just in case.
          Log.e(Constants.TAG, "Unable to parse authenticator type", e);
        } catch (PackageManager.NameNotFoundException e) {
          Log.e(Constants.TAG, "Application does not exist", e);
        }
      }
    }
    return authenticatorTypesToPackageNameMap;
  }

  private static String parseAccountType(
      PackageManager pm, XmlResourceParser parser, String packageName)
      throws IOException, XmlPullParserException, PackageManager.NameNotFoundException {
    while (parser.next() != XmlPullParser.END_DOCUMENT) {
      if (parser.getEventType() != XmlPullParser.START_TAG
          || !parser.getName().equals(AccountManager.AUTHENTICATOR_ATTRIBUTES_NAME)) {
        continue;
      }
      Resources appResources = pm.getResourcesForApplication(packageName);
      AttributeSet attrs = Xml.asAttributeSet(parser);
      return getResourceStringValue(appResources, attrs, android.R.attr.accountType);
    }
    return null;
  }

  /** Get the value of an arbitrary android.R.attr.*  */
  private static String getResourceStringValue(Resources resources, AttributeSet set, int resId) {
    final TypedArray sa = resources.obtainAttributes(set, new int[] {resId});
    try {
      final TypedValue tv = sa.peekValue(0);
      CharSequence data = null;
      if (tv != null && tv.type == TypedValue.TYPE_STRING) {
        if (tv.resourceId != 0) {
          data = resources.getString(tv.resourceId);
        } else {
          data = tv.string;
        }
      }
      return (data != null) ? data.toString() : null;
    } finally {
      sa.recycle();
    }
  }
}

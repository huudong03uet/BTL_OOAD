#include <iostream>
using namespace std;
int main() {
    int m, n;
    cin >> m >> n;
    int a[m][n];
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++)
            cin >> a[i][j];
    }

    // nếu chia mảng theo chiều dọc
    int tong_trai = 0;
    int tong_phai = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (j < n / 2) tong_trai += a[i][j];
            else tong_phai += a[i][j];

        }
    }

    // nếu chia mảng theo chiều ngang
    int tong_tren = 0;
    int tong_duoi = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (i < m / 2) tong_tren += a[i][j];
            else tong_duoi += a[i][j];
        }
    }

    if (abs(tong_trai - tong_phai) > abs(tong_tren - tong_duoi))
        cout << "chia theo chieu ngang";
    else
        cout << "chia theo chieu doc";

}
// input example

2 4
1 2 3 4
5 6 7 8
// output example
chia theo chieu ngang
```
